am5.ready(function() {
        
    // Create root element
    // https://www.amcharts.com/docs/v5/getting-started/#Root_element
    var root = am5.Root.new("grafico-barra");
    
    
    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/
    root.setThemes([
    am5themes_Animated.new(root)
    ]);
    
    
    // Create chart
    // https://www.amcharts.com/docs/v5/charts/xy-chart/
    var chart = root.container.children.push(am5xy.XYChart.new(root, {
    panX: false,
    panY: false,
    pinchZoomX: false,
    paddingLeft:0,
    layout: root.verticalLayout
    }));
    
    chart.set("colors", am5.ColorSet.new(root, {
    colors: [
        am5.color(0xf06529),
        am5.color(0x2965f1),
        am5.color(0xf0db4f),
        am5.color(0x787cb5),
        am5.color(0x00758f), /* f29111 */
        am5.color(0x2b7ffe),
        am5.color(0x004dc1),
        am5.color(0x3a0093)
    ]
    }))
    
    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    var xRenderer = am5xy.AxisRendererX.new(root, {
        minGridDistance: 20,
        minorGridEnabled: true
    });
    
    xRenderer.grid.template.setAll({
        location: 1
    })
    
    var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
        maxDeviation: 0.3,
        categoryField: "language",
        renderer: xRenderer,
        tooltip: am5.Tooltip.new(root, {})
    }));
    
    var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
        maxDeviation: 0.3,
        min: 0,
        renderer: am5xy.AxisRendererY.new(root, {
            strokeOpacity: 0.1
        })
    }));
    
    
    // Create series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    var series = chart.series.push(am5xy.ColumnSeries.new(root, {
        name: "Series 1",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "value",
        categoryXField: "language",
        tooltip: am5.Tooltip.new(root, {
            labelText: "{valueY}"
    }),
    }));
    
    series.columns.template.setAll({
        tooltipY: 0,
        tooltipText: "{categoryX}: {valueY}",
        shadowOpacity: 0.1,
        shadowOffsetX: 2,
        shadowOffsetY: 2,
        shadowBlur: 1,
        strokeWidth: 2,
        stroke: am5.color(0xffffff),
        shadowColor: am5.color(0x000000),
        cornerRadiusTL: 20,
        cornerRadiusTR: 20,
        fillGradient: am5.LinearGradient.new(root, {
            stops: [
            {}, // will use original column color
            { color: am5.color(0x1f1f1f) }
            ]
        }),
    // fillPattern: am5.GrainPattern.new(root, {
    //     // maxOpacity: 0.15,
    //     // density: 0.5,
    //     // colors: [am5.color(0x000000), am5.color(0x000000), am5.color(0xffffff)]  ----> Grainy effect
    // })
    });
    
    
    series.columns.template.states.create("hover", {
        shadowOpacity: 1,
        shadowBlur: 5,
        cornerRadiusTL: 10,
        cornerRadiusTR: 10
    })
    
    series.columns.template.adapters.add("fill", function (fill, target) {
    return chart.get("colors").getIndex(series.columns.indexOf(target));
    });
    
    // Set data
    var data = [{
        language: "HTML5",
        value: 2.5
        }, {
        language: "CSS3",
        value: 2.5
        }, {
        language: "JavaScript",
        value: 2.5
        }, {
        language: "PHP",
        value: 1
        }, {
        language: "MySql",
        value: 1
        }, {
        language: "C",
        value: 0.5
        }, {
        language: "C++",
        value: 1
        }, {
        language: "C#",
        value: 1.5
    }];
    
    xAxis.data.setAll(data);
    series.data.setAll(data);
    
    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
    series.appear(1000);
    chart.appear(1000, 100);
    
}); // end am5.ready()