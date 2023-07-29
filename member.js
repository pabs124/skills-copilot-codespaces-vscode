function skillsMember() {
    const member = document.querySelector('.member');
    const memberText = document.querySelector('.member-text');
    const memberBtn = document.querySelector('.member-btn');
    const memberClose = document.querySelector('.member-close');

    memberBtn.addEventListener('click', () => {
        member.classList.toggle('member-active');
        memberText.classList.toggle('member-text-active');
        memberBtn.classList.toggle('member-btn-active');
        memberClose.classList.toggle('member-close-active');
    });

    memberClose.addEventListener('click', () => {
        member.classList.toggle('member-active');
        memberText.classList.toggle('member-text-active');
        memberBtn.classList.toggle('member-btn-active');
        memberClose.classList.toggle('member-close-active');
    });
}