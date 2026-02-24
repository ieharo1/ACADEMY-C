var visible=false;
        function iniciar(){
            var elemento= document.getElementById("menu-img");
            elemento.addEventListener("click", mostrarMenu);
        }
        function mostrarMenu(){
            var elemento=document.getElementById("menuprincipal");
            var titulo=document.getElementById("particles-js");
            if(!visible){
                elemento.style.display="block";
                titulo.style.display="none";
                visible=true;
            }
            else{
                elemento.style.display="none";
                titulo.style.display="block";
                visible=false;
            }
        }
        window.addEventListener("load", iniciar);