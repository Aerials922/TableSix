// 获取所有 class 为 "button is-primary" 的按钮
const buttons = document.getElementsByClassName("button is-primary");

let stockChartInstance = null;

for (let btn of buttons) {
    btn.addEventListener('click', function () {
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

            // 优化时间标签显示，只显示月、日、时、分、秒（假设 timestamp 是 ISO 字符串或类似格式）
            // const labels = data.timestamp.map(ts => {
            //     if (typeof ts === 'string') {
            //         // 解析 ISO 格式时间
            //         const date = new Date(ts);
            //         if (!isNaN(date.getTime())) {
            //             const MM = String(date.getMonth() + 1).padStart(2, '0');
            //             const DD = String(date.getDate()).padStart(2, '0');
            //             const hh = String(date.getHours()).padStart(2, '0');
            //             const mm = String(date.getMinutes()).padStart(2, '0');
            //             const ss = String(date.getSeconds()).padStart(2, '0');
            //             return `${MM}-${DD} ${hh}:${mm}:${ss}`;
            //         }
            //     }
            //     return ts;
            // });

            const chart_data = {
                labels: labdata.timestamp,
                datasets: [
                    {
                        label: 'open',
                        data: data.open,
                        backgroundColor: 'rgba(54, 162, 235, 0.6)'
                    },
                    {
                        label: 'close',
                        data: data.close,
                        backgroundColor: 'rgba(255, 99, 132, 0.6)'
                    },
                    {
                        label: 'high',
                        data: data.high,
                        backgroundColor: 'rgba(255, 206, 86, 0.6)'
                    },
                    {
                        label: 'low',
                        data: data.low,
                        backgroundColor: 'rgba(75, 192, 192, 0.6)'
                    }
                ]
            };

            const config = {
                type: 'line', // 将 bar 改为 line
                data: chart_data,
                options: {
                    responsive: true,
                    plugins: {
                        legend: { position: 'top' },
                        title: {
                            display: true,
                            text: 'Real-time stock information for ' + ticker
                        }
                    },
                    scales: {
                        x: {
                            stacked: false,
                            ticks: {
                                // 每隔 N 个显示一个标签，比如每隔 5 个
                                callback: function (value, index, ticks) {
                                    return index % 5 === 0 ? this.getLabelForValue(value) : '';
                                },
                                maxRotation: 45, // 标签倾斜角度
                                minRotation: 45
                            }
                        }, // 折线图无需堆叠
                        y: { stacked: false }
                    }
                }
            };

            if (stockChartInstance) {
                stockChartInstance.destroy(); // 销毁旧的图表实例
            }
            stockChartInstance = new Chart(document.getElementById('stock-chart'), config);

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



// Single shared repos array for all logic
let repos = [];
const input = document.getElementById('searchInput');
const suggestions = document.getElementById('suggestions');

fetch('../us-stock-code-zh.json')
    .then(response => response.json())
    .then(data => {
        repos = Object.keys(data);
        renderRepoList();
    })
    .catch(error => {
        console.error('Error loading JSON:', error);
    });

function renderRepoList() {
    const repoList = document.getElementById('repoList');
    // Show only first 10 items, but allow scrolling for the rest
    repoList.style.maxHeight = "200px"; // Adjust height as needed
    repoList.style.overflowY = "auto";
    repoList.innerHTML = repos.slice(0, 5).map(r => `
                <a class="panel-block">
                    <span class="panel-icon">
                        <i class="fas fa-book" aria-hidden="true"></i>
                    </span>
                    ${r}
                </a>
            `).join('');
    // Add the rest of the items
    if (repos.length > 10) {
        repoList.innerHTML += repos.slice(10).map(r => `
                    <a class="panel-block">
                        <span class="panel-icon">
                            <i class="fas fa-book" aria-hidden="true"></i>
                        </span>
                        ${r}
                    </a>
                `).join('');
    }
}

input.addEventListener('input', function () {
    const value = this.value.trim().toLowerCase();
    if (value === "") {
        suggestions.style.display = "none";
        suggestions.innerHTML = "";
        return;
    }
    const filtered = repos.filter(r => r.toLowerCase().includes(value));
    if (filtered.length === 0) {
        suggestions.style.display = "none";
        suggestions.innerHTML = "";
        return;
    }
    suggestions.innerHTML = filtered.map(r => `<div class="panel-block" style="cursor:pointer;">${r}</div>`).join('');
    suggestions.style.display = "block";
});

suggestions.addEventListener('click', function (e) {
    if (e.target.classList.contains('panel-block')) {
        input.value = e.target.textContent;
        suggestions.style.display = "none";
    }
});

document.addEventListener('click', function (e) {
    if (!input.contains(e.target) && !suggestions.contains(e.target)) {
        suggestions.style.display = "none";
    }
});