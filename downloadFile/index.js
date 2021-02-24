// fileType  
// csv    text/csv;charset=utf-8;   
// excel  data:application/vnd.ms-excel;charset=utf-8;
/** download 文件下载
 * @param {array} data 文件数据
 * @param {string} fileName 文件名带后缀
 * @param {string} fileType 文件类型
 */
function download(data = [], 
    fileName = 'download.txt', 
    fileType = 'data:application/vnd.ms-excel;charset=utf-8;') {
    var blob = new Blob([data], {
        type: fileType
    });
    if (navigator.msSaveBlob) {
        // IE 10+
        navigator.msSaveBlob(blob, fileName);
    } else {
        var link = document.createElement('a');
        if (link.download !== undefined) {
            // feature detection
            // Browsers that support HTML5 download attribute
            var url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            link.setAttribute('download', fileName);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }
}


// json转excel
function convertToExcel(objArray, headers, filter) {
    if (!objArray) return;
    //转化json为object
    var arrData = typeof objArray != "object" ? JSON.parse(objArray) : objArray;

    var excel = "<table>";

    //设置表头
    var row = "<tr>";

    if (headers) {
        //使用标题项
        for (var i in headers) {
            row += "<th align='center'>" + headers[i] + "</th>";
        }
    } else {
        //不使用标题项
        for (var i in arrData[0]) {
            row += "<th align='center'>" + i + "</th>";
        }
    }

    excel += row + "</tr>";

    //设置数据
    for (var i = 0; i < arrData.length; i++) {
        var row = "<tr>";

        for (var index in arrData[i]) {
            //判断是否有过滤行
            if (filter) {
                if (filter.indexOf(index) == -1) {
                    var value = arrData[i][index] == null ? "" : arrData[i][index];
                    row += "<td>" + value + "</td>";
                }
            } else {
                var value = arrData[i][index] == null ? "" : arrData[i][index];
                row += "<td align='center' style='vnd.ms-excel.numberformat:@'>" + value + "</td>";
            }
        }

        excel += row + "</tr>";
    }

    excel += "</table>";

    var excelFile =
        "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:x='urn:schemas-microsoft-com:office:excel' xmlns='http://www.w3.org/TR/REC-html40'>";
    excelFile +=
        '<meta http-equiv="content-type" content="application/vnd.ms-excel; charset=UTF-8">';
    excelFile +=
        '<meta http-equiv="content-type" content="application/vnd.ms-excel';
    excelFile += '; charset=UTF-8">';
    excelFile += "<head>";
    excelFile += "<!--[if gte mso 9]>";
    excelFile += "<xml>";
    excelFile += "<x:ExcelWorkbook>";
    excelFile += "<x:ExcelWorksheets>";
    excelFile += "<x:ExcelWorksheet>";
    excelFile += "<x:Name>";
    excelFile += "{worksheet}";
    excelFile += "</x:Name>";
    excelFile += "<x:WorksheetOptions>";
    excelFile += "<x:DisplayGridlines/>";
    excelFile += "</x:WorksheetOptions>";
    excelFile += "</x:ExcelWorksheet>";
    excelFile += "</x:ExcelWorksheets>";
    excelFile += "</x:ExcelWorkbook>";
    excelFile += "</xml>";
    excelFile += "<![endif]-->";
    excelFile += "</head>";
    excelFile += "<body>";
    excelFile += excel;
    excelFile += "</body>";
    excelFile += "</html>";

    return excelFile;
}

// json转csv
function convertToCSV(objArray) {
    var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    var str = '';

    for (var i = 0; i < array.length; i++) {
        var line = '';
        for (var index in array[i]) {
            if (line != '') line += ',';

            line += array[i][index];
        }

        str += line + '\r\n';
    }

    return str;
}