// 获取所有 class 为 "button is-primary" 的按钮
const buttons = document.getElementsByClassName("button is-primary");

for (let btn of buttons) {
    btn.addEventListener('click', function() {
        const ticker = btn.textContent.trim();
        displayFinancialData(ticker);
    });
}

function displayFinancialData(ticker) {
    console.log(`Fetching financial data for ticker: ${ticker}`);
    // 前端通过 fetch 请求后端接口
    fetch(`http://localhost:3000/financial/get?ticker=${encodeURIComponent(ticker)}`)
        .then(res => res.json())
        .then(result => {
            const data = result.data.price_data;
            const tableBody = document.querySelector('#stock-table tbody');
            tableBody.innerHTML = ''; // 清空旧数据

            if (data && data.open && data.open.length) {
                for (let i = 0; i < data.open.length; i++) {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${data.open[i]}</td>
                        <td>${data.close[i]}</td>
                        <td>${data.high[i]}</td>
                        <td>${data.low[i]}</td>
                        <td>${data.volume[i]}</td>
                        <td>${data.timestamp[i]}</td>
                    `;
                    tableBody.appendChild(row);
                }
            } else {
                const row = document.createElement('tr');
                row.innerHTML = `<td colspan="6">No financial data available for ${ticker}</td>`;
                tableBody.appendChild(row);
            }
        })
        .catch(err => {
            alert('获取数据失败');
            console.error(err);
        });
}