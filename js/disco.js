am5.ready(function() {
  const query = window.matchMedia("(max-width: 426px)");
    // Create root element
    // https://www.amcharts.com/docs/v5/getting-started/#Root_element
    var root = am5.Root.new("grafico-disco");
    
    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/
    root.setThemes([
      am5themes_Animated.new(root)
    ]);
    
    
    // Create chart
    // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/
    var chart = root.container.children.push(
      am5percent.PieChart.new(root, {
        endAngle: 270,
        layout:root.verticalLayout,
        innerRadius: am5.percent(60)
      })
    );
        
    // Create series
    // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Series
    var series = chart.series.push(
      am5percent.PieSeries.new(root, {
        valueField: "value",
        categoryField: "editor",
        endAngle: 270
      })
    );
    
    series.set("colors", am5.ColorSet.new(root, {
      colors: [
        am5.color(0xfd79fd),
        am5.color(0x001e36),
        am5.color(0x115c77),
        am5.color(0xdc6920)
      ]
    }))
    
    var gradient = am5.RadialGradient.new(root, {
      stops: [
        { color: am5.color(0x000000) },
        {}
      ]
    })
    
    series.slices.template.setAll({
      fillGradient: gradient,
      strokeWidth: 1.5,
      stroke: am5.color(0xffffff),
      cornerRadius: 5,
      shadowOpacity: 0.1,
      shadowOffsetX: 2,
      shadowOffsetY: 2,
      shadowColor: am5.color(0x000000),
      // fillPattern: am5.GrainPattern.new(root, {
      //   maxOpacity: 0.2,
      //   density: 0.5,
      //   colors: [am5.color(0x000000)]
      // })
    })
    
    series.slices.template.states.create("hover", {
      shadowOpacity: 1,
      shadowBlur: 5
    })
    
    // series.ticks.template.setAll({
    //   strokeOpacity:0.4,
    //   strokeDasharray:[2,2]
    // })
    
    // series.states.create("hidden", {
    //   endAngle: -90
    // });
    
    // Set data
    // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Setting_data
    series.data.setAll([{
      editor: "Krita",
      value: 4.5
    }, {
      editor: "Photoshop",
      value: 3
    }, {
      editor: "Shotcut",
      value: 2.5
    }, {
      editor: "Ilustrator",
      value: 1
    }]);
    
    if(query.matches){
      var legend = chart.children.push(am5.Legend.new(root, {
        centerX: am5.percent(25),
        x: am5.percent(30),
        marginTop: 15,
        marginBottom: 25,
      }));
      legend.markerRectangles.template.adapters.add("fillGradient", function() {
        return undefined;
      })
      legend.data.setAll(series.dataItems);
      
      // series.appear(900, 100);
    }
    
}); // end am5.ready()