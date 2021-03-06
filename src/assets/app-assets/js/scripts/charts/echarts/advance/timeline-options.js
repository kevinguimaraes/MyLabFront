/* ------------------------------------------------------------------------------
 *
 *  # Echarts - timeline
 *
 *  Timeline chart addition
 *
 *  Version: 3.2
 *  Latest update: August 1, 2015
 *
 * ---------------------------------------------------------------------------- */

var dataMap = {};
function dataFormatter(obj) {
    var pList = ['Cliente1','Cliente2','Cliente3','Cliente4','Cliente5','Cliente6','Cliente7','Cliente8','Cliente9','Cliente10','Cliente11'];
    var temp;
    var max = 0;
    for (var year = 2010; year <= 2014; year++) {
        temp = obj[year];
        for (var i = 0, l = temp.length; i < l; i++) {
            max = Math.max(max, temp[i]);
            obj[year][i] = {
                name : pList[i],
                value : temp[i]
            }
        }
        obj[year+'max'] = Math.floor(max/100) * 100;
    }
    return obj;
}

function dataMix(list) {
    var mixData = {};
    for (var i = 0, l = list.length; i < l; i++) {
        for (var key in list[i]) {
            if (list[i][key] instanceof Array) {
                mixData[key] = mixData[key] || [];
                for (var j = 0, k = list[i][key].length; j < k; j++) {
                    mixData[key][j] = mixData[key][j] 
                                      || {name : list[i][key][j].name, value : []};
                    mixData[key][j].value.push(list[i][key][j].value);
                }
            }
        }
    }
    return mixData;
}

dataMap.dataGDP = dataFormatter({
    2014:[3.0,7.0,8.0,5.0,8.0,12.0,13.0,0.9,8.0,7.0,7.0,7.0,7.0,],
    2013:[3.0,7.0,8.0,5.0,8.0,12.0,13.0,0.9,8.0,7.0,7.0,7.0,7.0,],
    2012:[3.0,7.0,8.0,5.0,8.0,12.0,13.0,0.9,8.0,7.0,7.0,7.0,7.0,],
    2011:[3.0,7.0,8.0,5.0,8.0,12.0,13.0,0.9,8.0,7.0,7.0,7.0,7.0,],
    2010:[3.0,7.0,8.0,5.0,8.0,12.0,13.0,0.9,8.0,7.0,7.0,7.0,7.0,],
});

dataMap.dataPI = dataFormatter({
    2014:[3.0,7.0,8.0,5.0,8.0,12.0,13.0,0.9,8.0,7.0,7.0,7.0,7.0,],
    2013:[3.0,7.0,8.0,5.0,8.0,12.0,13.0,0.9,8.0,7.0,7.0,7.0,7.0,],
    2012:[3.0,7.0,8.0,5.0,8.0,12.0,13.0,0.9,8.0,7.0,7.0,7.0,7.0,],
    2011:[3.0,7.0,8.0,5.0,8.0,12.0,13.0,0.9,8.0,7.0,7.0,7.0,7.0,],
    2010:[3.0,7.0,8.0,5.0,8.0,12.0,13.0,0.9,8.0,7.0,7.0,7.0,7.0,],
});

dataMap.dataSI = dataFormatter({
    2014:[3.0,7.0,8.0,5.0,8.0,12.0,13.0,0.9,8.0,7.0,7.0,7.0,7.0,],
    2013:[3.0,7.0,8.0,5.0,8.0,12.0,13.0,0.9,8.0,7.0,7.0,7.0,7.0,],
    2012:[3.0,7.0,8.0,5.0,8.0,12.0,13.0,0.9,8.0,7.0,7.0,7.0,7.0,],
    2011:[3.0,7.0,8.0,5.0,8.0,12.0,13.0,0.9,8.0,7.0,7.0,7.0,7.0,],
    2010:[3.0,7.0,8.0,5.0,8.0,12.0,13.0,0.9,8.0,7.0,7.0,7.0,7.0,],
});

dataMap.dataTI = dataFormatter({
    2014:[3.0,7.0,8.0,5.0,8.0,12.0,13.0,0.9,8.0,7.0,7.0,7.0,7.0,],
    2013:[3.0,7.0,8.0,5.0,8.0,12.0,13.0,0.9,8.0,7.0,7.0,7.0,7.0,],
    2012:[3.0,7.0,8.0,5.0,8.0,12.0,13.0,0.9,8.0,7.0,7.0,7.0,7.0,],
    2011:[3.0,7.0,8.0,5.0,8.0,12.0,13.0,0.9,8.0,7.0,7.0,7.0,7.0,],
    2010:[3.0,7.0,8.0,5.0,8.0,12.0,13.0,0.9,8.0,7.0,7.0,7.0,7.0,],
});

dataMap.dataEstate = dataFormatter({
    2014:[3.0,7.0,8.0,5.0,8.0,12.0,13.0,0.9,8.0,7.0,7.0,7.0,7.0,],
    2013:[3.0,7.0,8.0,5.0,8.0,12.0,13.0,0.9,8.0,7.0,7.0,7.0,7.0,],
    2012:[3.0,7.0,8.0,5.0,8.0,12.0,13.0,0.9,8.0,7.0,7.0,7.0,7.0,],
    2011:[3.0,7.0,8.0,5.0,8.0,12.0,13.0,0.9,8.0,7.0,7.0,7.0,7.0,],
    2010:[3.0,7.0,8.0,5.0,8.0,12.0,13.0,0.9,8.0,7.0,7.0,7.0,7.0,],
});

dataMap.dataFinancial = dataFormatter({
    2014:[3.0,7.0,8.0,5.0,8.0,12.0,13.0,0.9,8.0,7.0,7.0,7.0,7.0,],
    2013:[3.0,7.0,8.0,5.0,8.0,12.0,13.0,0.9,8.0,7.0,7.0,7.0,7.0,],
    2012:[3.0,7.0,8.0,5.0,8.0,12.0,13.0,0.9,8.0,7.0,7.0,7.0,7.0,],
    2011:[3.0,7.0,8.0,5.0,8.0,12.0,13.0,0.9,8.0,7.0,7.0,7.0,7.0,],
    2010:[3.0,7.0,8.0,5.0,8.0,12.0,13.0,0.9,8.0,7.0,7.0,7.0,7.0,],
});

dataMap.dataGDP_Estate = dataMix([dataMap.dataEstate, dataMap.dataGDP]);
