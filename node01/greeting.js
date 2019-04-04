var currentDate = new Date();
module.exports.date = currentDate;

module.exports.getMessage = function(name){
    var hour = currentDate.getHours();
    if(hour > 10)
        return "Добрый вечер, " + name;
    else if(hour > 5)
        return "Добрый день, " + name;
    else
        return "Доброе утро, " + name;
}