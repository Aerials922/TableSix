const OUTPUT_SIZE = 'compact'; // 可选值：compact 或 full
const API_KEY = 'NDUWW8NOMS7G2JCB';
const INTERVAL = '30min';   // 1min 5min 15min 30min 60min

// 获取所有 class 为 "button is-primary" 的按钮
const buttons = document.getElementsByClassName("button is-primary");
const panel_blocks = document.getElementsByClassName("panel-block");

let stockChartInstance = null;

for (let btn of buttons) {
    btn.addEventListener('click', function () {
        const ticker = btn.textContent.trim();
        displayFinancialData(ticker);
    });
}

function displayFinancialData(ticker) {
    fetch(`http://localhost:3000/financial/external?ticker=${encodeURIComponent(ticker)}`)
        .then(res => res.json())
        .then(result => {
            const data = result.data.price_data;
            console.log(`Received financial data for ticker: ${ticker}`, data);
            const tableBody = document.querySelector('#stock-table tbody');
            tableBody.innerHTML = ''; // 清空旧数据

            const chart_data = {
                labels: data.timestamps,
                datasets: [
                    {
                        label: 'open',
                        data: data.opens,
                        backgroundColor: 'rgba(54, 162, 235, 0.6)'
                    },
                    {
                        label: 'close',
                        data: data.closes,
                        backgroundColor: 'rgba(255, 99, 132, 0.6)'
                    },
                    {
                        label: 'high',
                        data: data.highs,
                        backgroundColor: 'rgba(255, 206, 86, 0.6)'
                    },
                    {
                        label: 'low',
                        data: data.lows,
                        backgroundColor: 'rgba(75, 192, 192, 0.6)'
                    }
                ]
            };

            const config = {
                type: 'line',
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

            if (data && data.opens && data.opens.length) {
                for (let i = 0; i < data.opens.length; i++) {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${data.opens[i]}</td>
                        <td>${data.closes[i]}</td>
                        <td>${data.highs[i]}</td>
                        <td>${data.lows[i]}</td>
                        <td>${data.volumes[i]}</td>
                        <td>${data.timestamps[i]}</td>
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

// 记录当前选中的股票代码
let selectedTicker = null;

// 渲染仓库列表时，给每个选项添加点击事件
function renderRepoList() {
    const repoList = document.getElementById('repoList');
    repoList.style.maxHeight = "200px";
    repoList.style.overflowY = "auto";
    repoList.innerHTML = repos.slice(0, 5).map(r => `
        <a class="panel-block">
            <span class="panel-icon">
                <i class="fas fa-book" aria-hidden="true"></i>
            </span>
            ${r}
        </a>
    `).join('');
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

    // 绑定点击事件，处理选中状态
    Array.from(repoList.querySelectorAll('.panel-block')).forEach(item => {
        item.addEventListener('click', function () {
            // 移除所有选中样式
            repoList.querySelectorAll('.panel-block').forEach(el => el.classList.remove('is-active'));
            // 当前项添加选中样式
            this.classList.add('is-active');
            // 记录当前选中的股票代码
            selectedTicker = this.textContent.trim();
        });
    });
}

// Summit 按钮点击事件
const summitBtn = document.querySelector('.panel-block button.button.is-primary');
if (summitBtn) {
    summitBtn.addEventListener('click', function () {
        // 查找已激活的 panel-block
        const activeBlock = document.querySelector('#repoList .panel-block.is-active');
        if (activeBlock) {
            // 获取 ticker 内容
            const ticker = activeBlock.textContent.trim();
            displayFinancialData(ticker);
        } else {
            alert('请先选择一个股票代码');
        }
    });
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