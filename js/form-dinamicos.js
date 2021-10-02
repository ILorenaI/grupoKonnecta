//Eliminar sección clonada
function eliminar_elemento(codigo,contador){
    var ant = contador - 1;

    $('#form'+codigo+'c'+contador+'').remove();
    $('#opcform'+codigo+'c'+contador+'').remove();

    if(ant == 1)$('#opcform'+codigo).show();
    else $('#opcform'+codigo+'c'+ant).show();
}

//Clonar campos de una sección de formulario
function clonar_elemento(codigo,contador){
    if(contador==0){
        contador++;
        var clonedDiv = $('#form'+codigo+'').clone();
        clonedDiv.attr("id", "form"+codigo+"c"+contador);
        $('#clonar_seccion').append(clonedDiv);
        $('#form'+codigo+'c'+contador+'').hide();
    }
    else
    {
        contador++;
        var clonedDiv = $('#form'+codigo+'c1').clone();
        clonedDiv.attr("id", "form"+codigo+"c"+contador);
        $('#seccion'+codigo+'').append(clonedDiv);
        $('#form'+codigo+'c'+contador+'').show();
        var opciones = "<div id='opcform"+codigo+"c"+contador+"' class='row container-fluid'><div class='col-sm-12 col-lg-12 form-table' style='margin-top:-45px;'><a href='javascript:clonar_elemento("+codigo+","+contador+");' class='add_button' title='Add field'><span class='btn btn-low'>+ AGREGAR OTRO</span></a>   <a href='javascript:eliminar_elemento("+codigo+","+contador+");' title='Drop field'><span class='btn btn-low'>Eliminar</span></a></div></div>";
        $('#seccion'+codigo+'').append(opciones);	
    }

    if(contador==2){
        $('#opcform'+codigo+'').hide();
    }
    else if(contador>2){
        var ant = contador - 1;
        $('#opcform'+codigo+'c'+ant).hide();
    }
}

//Valida Tipos checkbox required que al menos seleccione una casilla, debe tener configurada la clase por grupo
function validar_checkbox(class_ch){
    checked = $('input.'+class_ch+'[type=checkbox]:checked ').length;
    requiredCheckboxes =  $('input.'+class_ch+'[type=checkbox]');
    if(checked>0){
        requiredCheckboxes.removeAttr('required');
    }
    else
    {
        requiredCheckboxes.attr('required', 'required');
    }
}

function loading_validate_form(form_id){
    var $myForm = $('#'+form_id);

    var res = $('#dinamic').valid();
    
    if($myForm[0].checkValidity() && !res==false) {
       $(".loader").fadeIn("slow");
    }
}
