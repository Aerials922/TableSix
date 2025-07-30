

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