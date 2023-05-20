    package com.branch.sikgu.member.entity;

    import com.branch.sikgu.board.entity.Board;
    import com.branch.sikgu.myPage.entity.MyPage;
    import lombok.Getter;
    import lombok.Setter;

    import javax.persistence.*;
    import java.time.LocalDate;
    import java.time.LocalDateTime;
    import java.util.ArrayList;
    import java.util.List;

    @Getter
    @Setter
    @Entity
    @Table(name = "MEMBERS")
    public class Member {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long memberId;
        @Column(name = "name", nullable = false)
        private String name;
        @Column(name = "email", nullable = false)
        private String email;
        @Column(name = "password", nullable = false)
        private String password;
        @Column(name = "nickname", nullable = false)
        private String nickname;
        @Column(name = "birthday", nullable = false)
        private LocalDate birthday;
        @Column(name = "gender", nullable = false, columnDefinition = "tinyint(1)")
        private Boolean gender;
        @Enumerated(EnumType.STRING)
        @Column(name = "status", nullable = false)
        private MemberStatus status = MemberStatus.MEMBER_ACTIVE;
        @Column(name = "created_at", nullable = false)
        private LocalDateTime createdAt;
        @Column(name = "updated_at")
        private LocalDateTime updatedAt;
        @OneToOne(mappedBy = "member", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
        @JoinColumn(name = "my_page_id")
        private MyPage myPage;
        public Member() {
            this.myPage = new MyPage();
            this.myPage.setMember(this);
        }

        @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
        private List<Board> boards = new ArrayList<>();

    //    private List<Group> groups = new ArrayList<>();


        public enum MemberStatus {
            MEMBER_ACTIVE("활동 중"),
            MEMBER_QUIT("탈퇴 상태");

            @Getter
            private String status;

            MemberStatus(String status) {
                this.status = status;
            }
        }

        // 시큐리티 역할 관리를 위해 추가...
        @ElementCollection(fetch = FetchType.EAGER)
        private List<String> roles = new ArrayList<>();

    }
