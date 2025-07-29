        const labels = ["09:30", "09:35", "09:40", "09:45", "09:50", "09:55", "10:00", "10:05","10:10","10:15","10:20","16:00"];
        const open = [148.00, 148.10, 148.30, 148.50, 148.60, 148.80, 149.00, 149.80, 148.10, 148.30, 148.50, 148.60];
        const close = [148.10, 148.30, 148.50, 148.60, 148.80, 149.00, 149.20, 150.00, 148.30, 148.50, 148.60, 148.80];
        const high = [148.20, 148.35, 148.55, 148.65, 148.85, 149.05, 149.25, 150.10, 148.35, 148.55, 148.65, 148.85];
        const low = [147.95, 148.05, 148.25, 148.45, 148.55, 148.75, 148.95, 149.75, 148.05, 148.25, 148.45, 148.55];

        const data = {
            labels: labels,
            datasets: [
                {
                    label: '开盘价',
                    data: open,
                    backgroundColor: 'rgba(54, 162, 235, 0.6)'
                },
                {
                    label: '收盘价',
                    data: close,
                    backgroundColor: 'rgba(255, 99, 132, 0.6)'
                },
                {
                    label: '高点',
                    data: high,
                    backgroundColor: 'rgba(255, 206, 86, 0.6)'
                },
                {
                    label: '低点',
                    data: low,
                    backgroundColor: 'rgba(75, 192, 192, 0.6)'
                }
            ]
        };

        const config = {
            type: 'line', // 将 bar 改为 line
            data: data,
            options: {
                responsive: true,
                plugins: {
                    legend: { position: 'top' },
                    title: {
                        display: true,
                        text: 'Apple Inc. 股票价格（每5分钟）'
                    }
                },
                scales: {
                    x: { stacked: false }, // 折线图无需堆叠
                    y: { stacked: false }
                }
            }
        };
        new Chart(document.getElementById('stockChart'), config);