var firebaseConfig = {
    apiKey: "AIzaSyC-1Lll_F6gKAOtgqHuaHaDWEfd0v78r6w",
    authDomain: "veiyon.firebaseapp.com",
    databaseURL: "https://veiyon.firebaseio.com",
    projectId: "veiyon",
    storageBucket: "veiyon.appspot.com",
    messagingSenderId: "1086340035914",
    appId: "1:1086340035914:web:e01b1cd32281ce23ddfdb3",
    measurementId: "G-WEFEQG4K09"
  };
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

function upload(){
    var uploader =document.getElementById('uploader');
    var iniLength = 0;
    var leng = document.getElementById("fileButton");
    var leng1 = leng.files;
    console.log(leng1.length)
    for (iniLength; iniLength < leng1.length; iniLength++)
    {
        var image = document.getElementById("fileButton").files[iniLength]
        var imageName = image.name;
        var storageRef = firebase.storage().ref('img/'+ imageName);
        task = storageRef.put(image);

        task.on('state_changed',
        function progress(snapshot){
            var percentage =(snapshot.bytesTransferred / snapshot.totalBytes)* 100;
            uploader.value = percentage;

        },
        function error(err){

        },
        function complete(){
            console.log("Completed..")
            // window.location.reload()
        }
        
        );
        
    }
  
}


var storage = firebase.storage();
var storageRef = storage.ref(); 
var i = 0;
var urlArray = [];
var DocArray = []
var iniArray = 0
storageRef.child('img/').listAll().then(function(result){
    result.items.forEach(function(imageRef){
        i++;
        displayImage(i , imageRef);
    });
 });

function displayImage(row,images){
    images.getDownloadURL().then(function(url){
        urlArray.push(url)
    for (iniArray; iniArray < urlArray.length;iniArray++){
        var Name = urlArray[iniArray].split('/')
        var Namelen = Name.length-1
        var Split2 = Name[Namelen].split('?')
        var Name2 = Split2[0]
        var img2F = Name2.split('img%2F')
        var NameFinal = img2F[1]
        NameFinal = NameFinal.replace(/%20/g,' ') 
        DocArray.push(NameFinal)
    }
    });

}

function myFun(){
    var table = document.getElementById('myTable')
    for (i=0; i<DocArray.length; i++){
        var row = table.insertRow(1);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        cell1.innerHTML = DocArray[i];
        cell2.innerHTML = '<a href= "' + urlArray[i]+'">Download</a>';
        
        document.getElementById("Disable").disabled = true;
    }
    
}
var DelArray = [];

function DeleteAllUploads(){
    for (i=0; i<DocArray.length; i++){
        var deleteRef = storageRef.child('img/'+DocArray[i]);
        deleteRef.delete().then(function(del){
        // DelArray.push(del)
 })
}
window.alert(DocArray.length + " - files Deleted.. please Refresh the page")
}

function  DeleteUpload(){
    var deleteRef = storageRef.child('img/'+prompt('Enter file name to delete'))
    deleteRef.delete().then(function(){
        window.location.reload()
    })
}

function Refresh(){
    window.location.reload()
}