
var http=require("http");
var url=require("url");
var queryString=require("querystring");

var httpServer = http.createServer(function(req,resp){
    query = url.parse(req.url).query;   //extraction de la requete
    params = queryString.parse(query);  //extraction du paramètre de la requete
    nom = params['nom'];                //extraction de la valeur du paramètre
    resp.writeHead(200,{'content-type':'text/html'})
    resp.end("<h1> <strong> Bonjour " + nom +  " </strong> </h1>");
});

httpServer.listen(8888,function(){
    console.log("Server NJS démarré")
})