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
    fetch(`http://localhost:3000/tab_six/stock/getFromDB?ticker=${encodeURIComponent(ticker)}`)
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
                    { label: 'open', data: data.opens, backgroundColor: 'rgba(54, 162, 235, 0.6)' },
                    { label: 'close', data: data.closes, backgroundColor: 'rgba(255, 99, 132, 0.6)' },
                    { label: 'high', data: data.highs, backgroundColor: 'rgba(255, 206, 86, 0.6)' },
                    { label: 'low', data: data.lows, backgroundColor: 'rgba(75, 192, 192, 0.6)' }
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
                                autoSkip: true,
                                maxTicksLimit: 10, // 最多显示10个刻度
                                callback: function (value, index, ticks) {
                                    // 精简为 "MM-DD" 或 "HH:mm"
                                    const label = this.getLabelForValue(value);
                                    if (label && label.length >= 16) {
                                        return label.slice(5, 10) + ' ' + label.slice(11, 16);
                                    }
                                    return label;
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
    repoList.innerHTML = repos.map(r => `
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
const stockTableContainer = document.getElementById('stock-table-container');
if (stockTableContainer) {
    stockTableContainer.style.display = 'none'; // 初始隐藏
}

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

            // 显示表格容器
            if (stockTableContainer) {
                stockTableContainer.style.display = '';
            }
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


let portfolioData = {};
const username = "t6";
const userAssets = fetch(`http://localhost:3000/tab_six/position/get?username=${username}`);
userAssets.then(response => response.json()).then(res => {
    console.log(res);
    // 假设 res.data 是资产数组
    const assets = res.data || [];
    console.log("asset", assets);
    let cashLeft = fetch(`http://localhost:3000/tab_six/user/getCash?username=${username}`);
    cashLeft.then(response => response.json()).then(cashRes => {
        console.log("cashLeft", cashRes);
        portfolioData.cashLeft = cashRes.data;
    });
    // 你可以根据 assets 计算总值等
    const totalCost = 10000000;
    let currentTotalValue = totalCost;
    let totalGainLoss = 0;
    portfolioData = {
        totalCost,
        currentTotalValue,
        totalGainLoss,
        assets
    };
    console.log(portfolioData);

    let stockValue = 0;
    let cashValue = 0;
    let stockPurchaseValue = 0;

    // 渲染资产明细表格
    const tbody = document.getElementById('asset-tbody');
    tbody.innerHTML = '';

    const fetchList = portfolioData.assets.map(asset =>
        fetch(`http://localhost:3000/tab_six/stock/getLastFromDB?ticker=${asset.ticker}`)
            .then(response => response.json())
            .then(data => {
                let currentPrice = Number(data.data.close);
                const tr = document.createElement('tr');
                let currentGainLoss = (currentPrice - asset.price) * asset.amount;
                tr.innerHTML = `
                    <td>STOCK</td>
                    <td>${asset.ticker.toUpperCase()}</td>
                    <td>${asset.amount}</td>
                    <td>¥${asset.price}</td>
                    <td>¥${currentPrice.toFixed(2)}</td>
                    <td>¥${currentGainLoss.toFixed(2)}</td>
                    <td>
                        <button class="button is-small is-danger sell-btn"
                            data-ticker="${asset.ticker}"
                            data-amount="${asset.amount}">
                            Sell
                        </button>
                    </td>
                `;
                stockValue += (currentPrice * asset.amount);
                stockPurchaseValue += (asset.price * asset.amount);
                totalGainLoss += currentGainLoss;
                tbody.appendChild(tr);
            })
            .catch(error => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>STOCK</td>
                    <td>${asset.ticker}</td>
                    <td>${asset.amount}</td>
                    <td>¥${asset.price}</td>
                    <td>获取失败</td>
                    <td>--</td>
                `;
                tbody.appendChild(tr);
            })
    );

    Promise.all(fetchList).then(() => {
        // 这里所有异步都完成了，totalGainLoss才是最终值
        console.log("totalGainLoss_final:", totalGainLoss);

        currentTotalValue = totalCost + totalGainLoss;

        // 渲染资产总览
        document.getElementById('total-cost').textContent = `¥${portfolioData.totalCost.toFixed(2)}`;
        document.getElementById('current-value').textContent = `¥${currentTotalValue.toFixed(2)}`;
        document.getElementById('total-gain').textContent = (totalGainLoss >= 0 ? '+' : '') + `¥${totalGainLoss.toFixed(2)}`;
        document.getElementById('total-gain').className = 'overview-value ' + (totalGainLoss >= 0 ? 'has-text-success' : 'has-text-danger');

        // 绑定ADD按钮事件
        const addBtn = document.getElementById('add-total-cost');
        if (addBtn) {
            addBtn.onclick = function () {
                const addValue = prompt('Please enter the amount to add (CNY):');
                const num = Number(addValue);
                if (isNaN(num) || num <= 0) {
                    alert('Please enter a valid positive amount');
                    return;
                }
                // 更新totalCost并刷新显示
                portfolioData.totalCost += num;
                document.getElementById('total-cost').textContent = `¥${portfolioData.totalCost.toFixed(2)}`;
                // 你可以在这里同步更新 currentTotalValue、totalGainLoss 等
                // 例如：
                const newCurrentTotalValue = portfolioData.totalCost + totalGainLoss;
                document.getElementById('current-value').textContent = `¥${newCurrentTotalValue.toFixed(2)}`;
            };
        }

        // 渲染饼图
        const cashValue = portfolioData.totalCost - stockPurchaseValue;
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

        // 卖出按钮事件绑定
        document.querySelectorAll('.sell-btn').forEach(btn => {
            btn.addEventListener('click', function () {
                const ticker = this.getAttribute('data-ticker');
                const maxAmount = Number(this.getAttribute('data-amount'));
                const sellAmount = prompt(`Please enter the amount of ${ticker} to sell (max ${maxAmount}):`);
                if (!sellAmount) return;
                const num = Number(sellAmount);
                if (isNaN(num) || num <= 0 || num > maxAmount) {
                    alert('Please enter a valid amount to sell');
                    return;
                }
                const username = 't6';
                fetch('http://localhost:3000/tab_six/exchange/buyingout', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username, ticker, amount: num })
                })
                    .then(res => res.json())
                    .then(result => {
                        if (result.success || result.message?.includes('successful')) {
                            alert('Sell successful!');
                            window.location.reload();
                        } else {
                            alert(result.message || 'Sell failed');
                        }
                    })
                    .catch(() => alert('Network error, sell failed'));
            });
        });
    });

}).catch(error => {
    console.error('Error fetching user assets:', error);
});

const buyingBtn = document.getElementById('buyingButton');
if (buyingBtn) {
    buyingBtn.addEventListener('click', function () {
        // 查找已激活的 panel-block
        const activateStockID = document.querySelector('#repoList .panel-block.is-active');
        if (activateStockID) {
            // 获取 ticker 内容
            const ticker = activateStockID.textContent.trim();
            const amountStr = prompt(`请输入要购买的 ${ticker} 数量:`);
            const amount = Number(amountStr);
            if (!amountStr || isNaN(amount) || amount <= 0) {
                alert('请输入有效的购买数量');
                return;
            }
            console.log(`Buying button clicked for ticker: ${ticker}, amount: ${amount}`, `username: ${username}`);
            fetch('http://localhost:3000/tab_six/exchange/buyingin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, ticker, amount })
            })
            .then(res => res.json())
            .then(result => {
                if (result.success || result.message?.includes('successful')) {
                    alert('Buy successful!');
                    window.location.reload();
                } else {
                    alert(result.message || 'Buy failed');
                }
            })
            .catch(() => alert('Network error, buy failed'));
        } else {
            alert('Please select a stock code first!');
        }
    });
}

