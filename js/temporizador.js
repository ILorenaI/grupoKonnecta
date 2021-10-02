function temporizador(segundos_max){
    var time = segundos_max; /* how long the timer runs for */
    var initialOffset = '440';
    var i = 1
    var time_restante = time;
    var interval = setInterval(function() {
        $('.circle_animation').css('stroke-dashoffset', initialOffset-(i*(initialOffset/time)));
        time_restante = time - i;
        var hora = segundos_minutos(time_restante);
        $('h2').text(hora);
        semaforo(segundos_max,time_restante);

        if (i == time) {
            clearInterval(interval);
            $("#dinamic").submit();
            alert('El tiempo se ha agotado. El formulario será enviado con las respuestas seleccionadas.');
        }

        i++;  
    }, 1000);
}

function segundos_minutos(segundos){
    var minutos = Math.floor(segundos/60);
    var segundos = (segundos%60);
    var lg_min = minutos.toString().length;
    var lg_seg = segundos.toString().length;
    
    if(lg_min<2){
        minutos = '0'+minutos;
    }
    if(lg_seg<2){
        segundos = '0'+segundos;
    }

    var hora = minutos+':'+segundos;

    return hora;
}


function semaforo(total,transcurrido){
    var porcentaje = (transcurrido/total)*100;
    if(porcentaje == 25){
        document.getElementById("circle").setAttribute("stroke","#B90505");
    }
    if(porcentaje == 50){
        document.getElementById("circle").setAttribute("stroke","#FB650A");
    }
    if(porcentaje == 75){
        document.getElementById("circle").setAttribute("stroke","#FFC200");
    }
}