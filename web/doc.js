const OUTPUT_SIZE = 'compact'; // 可选值：compact 或 full
const API_KEY = 'NDUWW8NOMS7G2JCB';
const INTERVAL = '30min';   // 1min 5min 15min 30min 60min

// 获取所有 class 为 "button is-primary" 的按钮
const buttons = document.getElementsByClassName("button is-primary");

let stockChartInstance = null;

// for (let btn of buttons) {
//     btn.addEventListener('click', function () {
//         const ticker = "";
//         displayFinancialData(ticker);
//     });
// }

function displayFinancialData(ticker) {
    fetch(`http://localhost:3000/tab_six/stock/external?ticker=${encodeURIComponent(ticker)}`)
        .then(res => res.json())
        .then(result => {
            const data = result.data;
            const stockInfo = document.querySelector('#stock_info');
            const stockTable = document.getElementById('stock-table');
            const stockChart = document.getElementById('stock-chart');

            // 判断数据有效性
            if (!data || !data.opens || !data.opens.length) {
                stockInfo.innerHTML = `
                    <div class="hero-body has-text-centered">
                        <h1 class="title is-2" style="color:red;">数据获取失败</h1>
                    </div>
                `;
                stockTable.style.display = 'none';
                stockChart.style.display = 'none';
                if (stockChartInstance) {
                    stockChartInstance.destroy();
                    stockChartInstance = null;
                }
                return;
            }

            // 数据有效，显示表格和图表
            stockInfo.innerHTML = `
                <div class="hero-body has-text-centered">
                    <h1 class="title is-2">Stock INFO.</h1>
                </div>
            `;
            stockTable.style.display = '';
            stockChart.style.display = '';

            // 动态生成表头
            const tableHead = stockTable.querySelector('thead');
            tableHead.innerHTML = `
                <tr>
                    <th>Open</th>
                    <th>Close</th>
                    <th>High</th>
                    <th>Low</th>
                    <th>Volume</th>
                    <th>Timestamp</th>
                </tr>
            `;

            const chart_data = {
                labels: data.timestamps,
                datasets: [
                    {label: 'open', data: data.opens, backgroundColor: 'rgba(54, 162, 235, 0.6)'},
                    {label: 'close', data: data.closes, backgroundColor: 'rgba(255, 99, 132, 0.6)'},
                    {label: 'high', data: data.highs, backgroundColor: 'rgba(255, 206, 86, 0.6)'},
                    {label: 'low', data: data.lows, backgroundColor: 'rgba(75, 192, 192, 0.6)'}
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
                                callback: function (value, index, ticks) {
                                    return index % 5 === 0 ? this.getLabelForValue(value) : '';
                                },
                                maxRotation: 45,
                                minRotation: 45
                            }
                        },
                        y: { stacked: false }
                    }
                }
            };

            if (stockChartInstance) {
                stockChartInstance.destroy();
            }
            stockChartInstance = new Chart(stockChart, config);

            const tableBody = stockTable.querySelector('tbody');
            tableBody.innerHTML = '';
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
        })
        .catch(err => {
            const stockInfo = document.querySelector('#stock_info');
            const stockTable = document.getElementById('stock-table');
            const stockChart = document.getElementById('stock-chart');
            stockInfo.innerHTML = `
                <div class="hero-body has-text-centered">
                    <h1 class="title is-2" style="color:red;">数据获取失败</h1>
                </div>
            `;
            stockTable.style.display = 'none';
            stockChart.style.display = 'none';
            if (stockChartInstance) {
                stockChartInstance.destroy();
                stockChartInstance = null;
            }
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
        <a class="panel-block" id="CompanyStockID"> 
            <span class="panel-icon">
                <i class="fas fa-book" aria-hidden="true"></i>
            </span>
            ${r}
        </a>
    `).join('');
    if (repos.length > 10) {
        repoList.innerHTML += repos.slice(10).map(r => `
            <a class="panel-block"  id="CompanyStockID">
                <span class="panel-icon">
                    <i class="fas fa-book" aria-hidden="true"></i>
                </span>
                ${r}
            </a>
        `).join('');
    }

    // 绑定点击事件，处理选中状态
    Array.from(repoList.querySelectorAll('#CompanyStockID')).forEach(item => {
        item.addEventListener('click', function () {
            // 移除所有选中样式和自定义样式
            repoList.querySelectorAll('#CompanyStockID').forEach(el => {
                el.classList.remove('is-active');
                el.style.backgroundColor = '';
                el.style.color = '';
            });
            // 当前项添加选中样式，只能单选
            this.classList.add('is-active');
            this.style.backgroundColor = 'rgb(0, 209, 178)';
            this.style.color = 'white';
        });
    });
}

// Summit 按钮点击事件
const summitBtn = document.querySelector('#submitButton');
if (summitBtn) {
    summitBtn.addEventListener('click', function () {
        // 查找已激活的 panel-block
        const activateStockID = document.querySelector('#repoList .panel-block.is-active');
        if (activateStockID) {
            // 获取 ticker 内容
            const ticker = activateStockID.textContent.trim();
            console.log(`Summit button clicked for ticker: ${ticker}`);
            displayFinancialData(ticker);
        } else {
            alert('请先选择一个股票代码!');
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

    // 先移除repoList所有选中样式
    const repoList = document.getElementById('repoList');
    repoList.querySelectorAll('.panel-block').forEach(el => {
        el.classList.remove('is-active');
        el.style.backgroundColor = '';
        el.style.color = '';
    });

    // 在repoList中找到对应项并高亮
    const match = Array.from(repoList.querySelectorAll('.panel-block')).find(
        el => el.textContent.trim() === e.target.textContent.trim()
    );
    if (match) {
        match.classList.add('is-active');
        match.style.backgroundColor = 'rgb(0, 209, 178)';
        match.style.color = 'white';
    }

    // 给当前suggestion项也加高亮
    e.target.classList.add('is-active');
    e.target.style.backgroundColor = 'rgb(0, 209, 178)';
    e.target.style.color = 'white';
});

document.addEventListener('click', function (e) {
    if (!input.contains(e.target) && !suggestions.contains(e.target)) {
        suggestions.style.display = "none";
    }
});

// 示例数据，实际可通过fetch从后端获取
const portfolioData = {
    totalCost: 100000,
    currentValue: 120000,
    totalGain: 50000,
    assets: [
        { type: 'Stock', name: '招商银行', quantity: 500, value: 20000, gain: 2000 },
        { type: 'Stock', name: '贵州茅台', quantity: 100, value: 18000, gain: 1500 },
        { type: 'Cash', name: '人民币', quantity: '--', value: 82000, gain: null }
    ]
};



// 渲染资产总览
document.getElementById('total-cost').textContent = `¥${portfolioData.totalCost.toLocaleString()}`;
document.getElementById('current-value').textContent = `¥${portfolioData.currentValue.toLocaleString()}`;
const gain = portfolioData.totalGain;
document.getElementById('total-gain').textContent = (gain >= 0 ? '+' : '') + `¥${gain.toLocaleString()}`;
document.getElementById('total-gain').className = 'overview-value ' + (gain >= 0 ? 'has-text-success' : 'has-text-danger');

// 渲染资产明细表格
const tbody = document.getElementById('asset-tbody');
tbody.innerHTML = '';
portfolioData.assets.forEach(asset => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
        <td>${asset.type}</td>
        <td>${asset.name}</td>
        <td>${asset.quantity}</td>
        <td>¥${asset.value.toLocaleString()}</td>
        <td class="${asset.gain === null ? '' : (asset.gain >= 0 ? 'has-text-success' : 'has-text-danger')}">
            ${asset.gain === null ? '--' : (asset.gain >= 0 ? '+' : '') + '¥' + asset.gain.toLocaleString()}
        </td>
    `;
    tbody.appendChild(tr);
});

// 渲染饼图
const stockValue = portfolioData.assets.filter(a => a.type === 'Stock').reduce((sum, a) => sum + a.value, 0);
const cashValue = portfolioData.assets.filter(a => a.type === 'Cash').reduce((sum, a) => sum + a.value, 0);

const data = {
    labels: ['Stock', 'Cash'],
    datasets: [{
        data: [stockValue, cashValue],
        backgroundColor: ['#2d8cf0', '#f5a623'],
        borderWidth: 0
    }]
};
const config = {
    type: 'pie',
    data: data,
    options: {
        plugins: {
            legend: { display: false }
        }
    }
};
new Chart(document.getElementById('pieChart'), config);

