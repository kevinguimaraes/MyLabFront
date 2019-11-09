/*=========================================================================================
    File Name: timeline.js
    Description: echarts timeline chart
    ----------------------------------------------------------------------------------------
    Item Name: Stack - Responsive Admin Theme
    Version: 3.2
    Author: PIXINVENT
    Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

// Timeline chart
// ------------------------------

$(window).on("load", function(){

    // Set paths
    // ------------------------------

    require.config({
        paths: {
            echarts: '../../../app-assets/vendors/js/charts/echarts'
        }
    });


    // Configuration
    // ------------------------------

    require(
        [
            'echarts',
            'echarts/chart/bar',
            'echarts/chart/line'
        ],


        // Charts setup
        function (ec) {

            // Initialize chart
            // ------------------------------
            var myChart = ec.init(document.getElementById('timeline'));

            // Chart Options
            // ------------------------------
            chartOptions = {

                // Setup timeline
                timeline: {
                    data: ['2019-07-01', '2019-08-01', '2019-09-01', '2019-10-01', '2019-11-01'],
                    x: 10,
                    x2: 10,
                    label: {
                        formatter: function(s) {
                            return s.slice(0, 4);
                        }
                    },
                    autoPlay: true,
                    playInterval: 3000
                },

                // Main options
                options: [
                    {

                        // Setup grid
                        grid: {
                            x: 55,
                            x2: 110,
                            y: 35,
                            y2: 100
                        },

                        // Add tooltip
                        tooltip: {
                            trigger: 'axis'
                        },

                        // Add legend
                        legend: {
                            data: ['Turbidez','Alcalinidade','Salinidade','Resistividade','PH','Condutividade']
                        },

                        // Add Color
                        color: ['#00A5A8', '#626E82', '#FF7D4D','#FF4558', '#16D39A', '#FFC400'],

                        // Add toolbox
                        toolbox: {
                            show: true,
                            orient: 'vertical',
                            x: 'right',
                            y: 70,
                            feature: {
                                mark: {
                                    show: true,
                                    title: {
                                        mark: 'Markline switch',
                                        markUndo: 'Undo markline',
                                        markClear: 'Clear markline'
                                    }
                                },
                                dataView: {
                                    show: true,
                                    readOnly: false,
                                    title: 'View data',
                                    lang: ['View chart data', 'Close', 'Update']
                                },
                                magicType: {
                                    show: true,
                                    title: {
                                        line: 'Switch to line chart',
                                        bar: 'Switch to bar chart',
                                        stack: 'Switch to stack',
                                        tiled: 'Switch to tiled'
                                    },
                                    type: ['line', 'bar', 'stack', 'tiled']
                                },
                                restore: {
                                    show: true,
                                    title: 'Restore'
                                },
                                saveAsImage: {
                                    show: true,
                                    title: 'Same as image',
                                    lang: ['Save']
                                }
                            }
                        },

                        // Enable drag recalculate
                        calculable: true,

                        // Horizontal axis
                        xAxis: [{
                            type: 'category',
                            axisLabel: {
                                interval: 0
                            },
                            data: ['Client1','Client2','Client3','Client4','Client5','Client6','Client7','Client8','Client9','Client10','Client11']
                        }],

                        // Vertical axis
                        yAxis: [
                            {
                                type: 'value',
                                name: 'GDPï¼ˆmillion)',
                                max: 14.0
                            },
                            {
                                type: 'value',
                                name: 'Otherï¼ˆmillion)'
                            }
                        ],

                        // Add series
                        series: [
                            {
                                name: 'Turbidez',
                                type: 'bar',
                                markLine: {
                                    symbol: ['arrow','none'],
                                    symbolSize: [4, 2],
                                    itemStyle: {
                                        normal: {
                                            lineStyle: {color: 'orange'},
                                            barBorderColor: 'orange',
                                            label: {
                                                position: 'left',
                                                formatter: function(params) {
                                                    return Math.round(params.value);
                                                },
                                                textStyle: {color: 'orange'}
                                            }
                                        }
                                    },
                                    data: [{type: 'average', name: 'Average'}]
                                },
                                data: dataMap.dataGDP['2010']
                            },
                            {
                                name: 'Alcalinidade',
                                yAxisIndex: 1,
                                type: 'bar',
                                data: dataMap.dataFinancial['2010']
                            },
                            {
                                name: 'Salinidade',
                                yAxisIndex: 1,
                                type: 'bar',
                                data: dataMap.dataEstate['2010']
                            },
                            {
                                name: 'Resistividade',
                                yAxisIndex: 1,
                                type: 'bar',
                                data: dataMap.dataPI['2010']
                            },
                            {
                                name: 'PH',
                                yAxisIndex: 1,
                                type: 'bar',
                                data: dataMap.dataSI['2010']
                            },
                            {
                                name: 'Condutividade',
                                yAxisIndex: 1,
                                type: 'bar',
                                data: dataMap.dataTI['2010']
                            }
                        ]
                    },

                    // 2011 data
                    {
                        series: [
                            {data: dataMap.dataGDP['2011']},
                            {data: dataMap.dataFinancial['2011']},
                            {data: dataMap.dataEstate['2011']},
                            {data: dataMap.dataPI['2011']},
                            {data: dataMap.dataSI['2011']},
                            {data: dataMap.dataTI['2011']}
                        ]
                    },

                    // 2012 data
                    {
                        series: [
                            {data: dataMap.dataGDP['2012']},
                            {data: dataMap.dataFinancial['2012']},
                            {data: dataMap.dataEstate['2012']},
                            {data: dataMap.dataPI['2012']},
                            {data: dataMap.dataSI['2012']},
                            {data: dataMap.dataTI['2012']}
                        ]
                    },

                    // 2013 data
                    {
                        series: [
                            {data: dataMap.dataGDP['2013']},
                            {data: dataMap.dataFinancial['2013']},
                            {data: dataMap.dataEstate['2013']},
                            {data: dataMap.dataPI['2013']},
                            {data: dataMap.dataSI['2013']},
                            {data: dataMap.dataTI['2013']}
                        ]
                    },

                    // 2014 data
                    {
                        series: [
                            {data: dataMap.dataGDP['2014']},
                            {data: dataMap.dataFinancial['2014']},
                            {data: dataMap.dataEstate['2014']},
                            {data: dataMap.dataPI['2014']},
                            {data: dataMap.dataSI['2014']},
                            {data: dataMap.dataTI['2014']}
                        ]
                    }
                ]
            };


            // Apply options
            // ------------------------------

            myChart.setOption(chartOptions);


            // Resize chart
            // ------------------------------

            $(function () {

                // Resize chart on menu width change and window resize
                $(window).on('resize', resize);
                $(".menu-toggle").on('click', resize);

                // Resize function
                function resize() {
                    setTimeout(function() {

                        // Resize chart
                        myChart.resize();
                    }, 200);
                }
            });
        }
    );
});