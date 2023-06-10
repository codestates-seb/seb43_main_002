package com.branch.sikgu.review.service;

import com.branch.sikgu.exception.BusinessLogicException;
import com.branch.sikgu.exception.ExceptionCode;
import com.branch.sikgu.exception.HttpStatus;
import com.branch.sikgu.meal.history.entity.History;
import com.branch.sikgu.meal.history.repository.HistoryRepository;
import com.branch.sikgu.member.service.MemberService;
import com.branch.sikgu.member.entity.Member;
import com.branch.sikgu.review.dto.ReviewDto;
import com.branch.sikgu.review.entity.Review;
import com.branch.sikgu.review.repository.ReviewRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;
import java.util.List;
import java.util.Objects;

@Service
@Transactional
@AllArgsConstructor
@Slf4j
public class ReviewService {
        private HistoryRepository historyRepository;
        private MemberService memberService;
        private ReviewRepository reviewRepository;

        public void addReviewAndLikeToMember(Long historyId, Long memberId, ReviewDto.Post requestDto, Authentication authentication) {
        // History 조회
        History history = historyRepository.findById(historyId)
                .orElseThrow(() -> new EntityNotFoundException("History not found with id: " + historyId));

        // 현재 요청을 보낸 사용자 정보 가져오기
        Member currentMember = memberService.findVerifiedMember(memberService.getCurrentMemberId(authentication));
        Member targetMember = memberService. findVerifiedMember(memberId);


        // 1, 2 검증
        isReviewExistsForUser(historyId, memberId, authentication);
        validateCurrentUserIsMember(history, currentMember);
            validateCurrentUserIsMember(history, targetMember);

        // History에 리뷰와 좋아요 추가
            Review review = reviewRepository.findByReviewerAndTargetMemberAndHistory(currentMember, targetMember, history);
            review.setContent(requestDto.getReviewContent());
            review.setLiked(requestDto.isLiked());
            review.setReviewer(currentMember);
            review.setTargetMember(targetMember);
            review.setHistory(history);
            review.setStatus(Review.ReviewStatus.REVIEW_SUBMITTED);

        history.getReviews().add(review);

            // 모든 리뷰 작성 확인 및 History 상태 변경
            if (checkAllReviewsSubmitted(history)) {
                history.setStatus(true);
            }

        // History 저장
        historyRepository.save(history);
    }

    // 1. 히스토리가 존재하는지 확인하고 이미 리뷰를 남긴 타겟멤버인지 확인
    public void isReviewExistsForUser(Long historyId, Long targetMemberId, Authentication authentication) {
        // 히스토리가 존재하는지 확인
        History history = historyRepository.findById(historyId)
                .orElseThrow(() -> new EntityNotFoundException("History not found with id: " + historyId));
        // 특정 멤버가 해당 History 내의 동일한 멤버에게 이미 리뷰를 남겼는지 확인 (이미 작성했다면 true)
        boolean isDuplicateReview = history.getReviews().stream()
                .filter(review -> review.getReviewer().getMemberId().equals(memberService.getCurrentMemberId(authentication)))
                .filter(review -> review.getTargetMember().getMemberId().equals(targetMemberId))
                .anyMatch(review -> review.getStatus() == Review.ReviewStatus.REVIEW_SUBMITTED);
        if (isDuplicateReview) {
            throw new BusinessLogicException(ExceptionCode.DUPLICATE_REVIEW, HttpStatus.BAD_REQUEST);
        }
        // 본인에게는 리뷰할 수 없는 로직
        if (targetMemberId.equals(memberService.getCurrentMemberId(authentication)))
        {
            throw new BusinessLogicException(ExceptionCode.CAN_NOT_REVIEW_MYSELF, HttpStatus.BAD_REQUEST);
        }
    }

    // 2. 식사에 참여한 멤버인지 확인
    public void validateCurrentUserIsMember(History history, Member member) {
        List<Member> members = history.getMembers();
        if (!members.contains(member)) {
            throw new AccessDeniedException("현재 멤버는 히스토리의 멤버가 아닙니다.");
        }
    }

    // 모든 리뷰 작성 확인
    private boolean checkAllReviewsSubmitted(History history) {
        List<Review> reviews = history.getReviews();

        // History 내의 모든 리뷰의 상태 확인
        for (Review review : reviews) {
            if (review.getStatus() != Review.ReviewStatus.REVIEW_SUBMITTED) {
                return false; // 작성되지 않은 리뷰가 존재하면 false 반환
            }
        }
        return true; // 모든 리뷰가 작성되었으면 true 반환
    }


}
