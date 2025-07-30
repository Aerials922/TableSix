document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');
    if (!loginForm) return;

    loginForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        const username = document.getElementById('username').value.trim();
        console.log(`Username entered: ${username}`);
        const password = document.getElementById('password').value;
        console.log(`Password entered: ${password}`);

        try {
            const response = await fetch('http://localhost:3000/tab_six/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            if (response.ok) {
                window.location.href = 'index.html';
            } else {
                const result = await response.json();
                alert('登录失败，请重试' || result.message);
            }
        } catch (error) {
            alert('网络错误，请稍后重试');
        }
    });
});