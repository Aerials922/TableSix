document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registerForm');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch('http://localhost:3000/tab_six/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (response.ok) {
                alert('注册成功！即将跳转到登录页面。');
                window.location.href = '/login.html';
            } else {
                alert(result.message || '注册失败，请重试。');
            }
        } catch (error) {
            alert('网络错误，请稍后重试。');
        }
    });
});