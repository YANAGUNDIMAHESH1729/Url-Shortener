const msg = document.getElementById("generatedUrl");
        if (msg){
         setTimeout(() => {
         msg.classList.add("fade-out"); 
         setTimeout(() => msg.remove(), 1000); 
    }, 10000);
}