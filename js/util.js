var utils = (function () {
  return {
    wasInside: true,
    init: function init() {
      this.tecladoValue = "";
      utils.configModal(); // this.initValueScroll();

      //jQuery(window).on("scroll", utils.scrollHeader);
      jQuery("#searchTerm").focus(utils.searchFocus);
      jQuery("#searchTerm").focusout(utils.searchOutFocus);
      utils.tooltip("button");
    },
    initClearSearch: function initClearSearch() {
      $(".govco-icon.govco-icon-plus.govco-icon-close").on("click", function () {
        var inputSearch = $(this).parent().find(".search_input");
        inputSearch.val('')
      })
    },
    /* inicion miga de pan */
    initBreadcrumb: function initBreadcrumb(id) { 
      if ($('#' + id).length) {        
        var currentUrl = window.location.href;
        var urlBase = $('#' + id).attr('href');
        
        window.setInterval(function(){
            if(window.location.href != currentUrl){
              currentUrl = window.location.href;
              utils.assemblyBreadcrumb(id, urlBase, currentUrl);
            }
        }, 1000);
  
        utils.assemblyBreadcrumb(id, urlBase, currentUrl);
      }     
    },
    assemblyBreadcrumb: function assemblyBreadcrumb(id, urlBase, currentUrl) {
      if (urlBase.substr(urlBase.length - 1, 1) !== '/') {
        urlBase += '/';
      }
      var urls = currentUrl.replace(urlBase, '').split('/');
      var url = (urlBase.includes('#')) ? '#/' : '/';
      var nodeLiBase = $('#' + id).parent();
      var parentBreadcrumb = $('#' + id).parent().parent('.breadcrumb');
      $('#' + id).parent().parent('.breadcrumb').find('.breadcrumb-item').remove();
      parentBreadcrumb.append(nodeLiBase);
      for (let i = 0; i < urls.length; i++) {
        var liAdd = document.createElement('li');
        if (i == (urls.length-1)) {
          $(liAdd).addClass('breadcrumb-item active').attr('aria-current', 'page').text(urls[i]);
        } else {
          url += urls[i] + '/';
          var linkAdd = document.createElement('a');
          $(linkAdd).attr('href', url).text(urls[i]);

          $(liAdd).append(linkAdd).addClass('breadcrumb-item');
        }        
        parentBreadcrumb.append(liAdd);
      }
    },
    /* Avance en Tabs (Siguiente)*/
    tabSiguiente:function validar_pagina(numero){

			if($("#dinamic").valid()){ 
				var actual = numero - 1;
				$("#p"+numero).addClass("active show");
				$("#p"+numero+'-tab').addClass("active");
				$("#p"+actual+'-tab').removeClass("active");
				$("#p"+actual+'-tab').addClass("advance");
				$("#p"+actual).removeClass("active show");

				var progress = $('.progress-bar');
				var prog = (numero == 4) ? 100 : (25 * (numero-1)) + 3;
				progress.width(prog + '%');
				
				document.getElementById("btn_top").click();

			} else {
				return false;
			}

			return false;
		},

    /* inicio para la linea de avance */
    initLineAdvance: function initLineAdvance() {
      $('.navs-link-advance > .nav-link-advance').on('click', function() {
        var navActive = $(this).siblings('.nav-link-advance.active');
        var valueClick = $(this).attr('value');
        var valueActive = navActive.attr('value');
        var progress = $(this).parent().parent('.gov-co-advance').find('.progress-bar');
        var v;
        if($("#dinamic").valid()){ 
          v = 0;
            } else {
              v = 1;
            }

        if ((valueClick - valueActive) > 1 || (valueClick - valueActive) < -1 ||  (v == 1))  {
          return;
        }
        if ((valueClick > valueActive) && (v == 0)) {
          navActive.removeClass('active').addClass('advance');
        } else {          
          navActive.removeClass('active');
          $(this).removeClass('advance');
        }
        $(this).addClass('active');
        var prog = (valueClick == 4) ? 100 : (25 * (valueClick-1)) + 3;
        progress.width(prog + '%');
      });
      return false;
    },
    /* Inicio menu dinamico de sedes */
    initMenuDinamic: function initMenuDinamic() {      
      $(".dropdown-menu a[data-toggle='dropdown'").on('click', function(e) {
        if (!$(this).next().hasClass('show')) {
          $(this).parents('.dropdown-menu').first().find('.show').removeClass("show");
        }
        $(this).parent().addClass('show');
        var $subMenu = $(this).next(".dropdown-menu");
        $subMenu.addClass('show');
      
      
        $(this).parents('div.navbar-button.dropdown.show').on('hidden.bs.dropdown', function(e) {
          $('.dropdown-menu .show').removeClass("show");
        });      
      
        return false;
      });
    },
    // Agregar contador input label
    countCharacterInput: function countCharacterInput(id, maxCharacters, mensajeError) {
      var counter = 0;
      var elementCounter = document.createElement('small')
      elementCounter.innerHTML = counter + '/' + maxCharacters;

      var labelInput = $('label[for="' + id + '"]');
      labelInput.after(elementCounter)

      var inputCount = $('#' + id)[0];
      var areaNote = $('#' + inputCount.getAttribute('aria-describedby').replace("#", ""))[0];
      

      inputCount.addEventListener("input", () => {
        counter = inputCount.value.length;
        elementCounter.innerHTML = counter + '/' + maxCharacters;
        if (counter > maxCharacters) {
          areaNote.innerHTML = mensajeError;
          $('#' + id).parent().addClass('gov-co-error');
        }else{          
          $('#' + id).parent().removeClass('gov-co-error');
        }
      })
    },

    // FunciÃ³n que agrega contador de carÃ¡cteres a textarea
    countCharacter: function countCharacter(idTextArea, maxCharacters) {
      var text = document.getElementById(idTextArea);
      var wrapper = document.createElement("div");
      var c_wrap = document.createElement("div");
      var count = document.createElement("span");
      var message = document.createElement("span");
      wrapper.className = "div-character";
      wrapper.id = "div" + idTextArea;
      c_wrap.innerHTML = "";
      c_wrap.className = "div-count-character"; // Mensaje de advertencia

      message.className = "hidden span-message-character";
      message.id = "message" + idTextArea;
      message.innerText = "AlcanzÃ³ el mÃ¡ximo de carÃ¡cteres permitidos"; // Contador de carÃ¡cteres

      count.className = "float-right pr-3 span-count-character";
      count.id = "count" + idTextArea;
      text.parentNode.appendChild(wrapper);
      wrapper.appendChild(text);
      c_wrap.appendChild(message);
      c_wrap.appendChild(count);
      wrapper.appendChild(c_wrap);

      function _set() {
        count.innerHTML = maxCharacters - this.value.length || 0;
        var countCharacters = maxCharacters - this.value.length;
        var elementMessage = jQuery(
          "#div" + idTextArea + " #message" + idTextArea
        );
        var elementCount = jQuery("#div" + idTextArea + " #count" + idTextArea);

        if (countCharacters <= 0) {
          elementMessage.removeClass("hidden");
          elementCount.css("color", "red");
        } else if (elementMessage.hasClass("hidden") == false) {
          elementMessage.addClass("hidden");
          elementCount.css("color", "#0B457F");
        }

        count.innerHTML = countCharacters || 0;
      }

      text.addEventListener("input", _set);

      _set.call(text);
    },
    // FunciÃ³n que valida si sale del sitio
    leaveSite: function leaveSite(url) {
      var message =
        "Con esta acciÃ³n abrirÃ¡s una nueva pestaÃ±a. Â¡Te esperamos pronto!";
      var opcAction = [
        {
          text: "Cancelar",
          action: "utils.hideModal('alert-modal')",
          class: "btn-middle",
        },
        {
          text: "Continuar",
          action: "utils.modalGoTo('" + url + "', 'alert-modal')",
          class: "btn-high",
        },
      ];
      utils.callModalAlert(
        "warning",
        "EstÃ¡s saliendo de GOV.CO",
        message,
        opcAction
      );
    },
    examplesAlerts: function examplesAlerts(tipo) {
      var opcAction = [
        {
          text: "Cancelar",
          action: "utils.hideModal('alert-modal')",
          class: "btn-middle",
        },
      ];
      utils.callModalAlert(
        tipo,
        "Modal tipo " + tipo,
        "InformaciÃ³n de detalle al cierre de la acciÃ³n",
        opcAction
      );
    },
    // FunciÃ³n obtiene modal de mantenimiento
    maintenanceSite: function maintenanceSite() {
      var message =
        "Esta pÃ¡gina esta en mantenimiento en breve estaremos de vuelta.<br><br>";
      message +=
        "Puedes escribirnos a soporteccc@mintic.gov.co.<br>LlÃ¡manos gratis: 01 8000 910742 y en BogotÃ¡: 3 90 79 51";
      var opcAction = [];
      utils.callModalAlert(
        "maintenance",
        "En mantenimiento",
        message,
        opcAction
      );
    },
    // FunciÃ³n obtiene modal de error de sitio
    errorSite: function errorSite() {
      var message =
        "Puedes escribirnos a soporteccc@mintic.gov.co.<br>LlÃ¡manos gratis: 01 8000 910742 y en BogotÃ¡: 3 90 79 51";
      var opcAction = [
        {
          text: "Regresar",
          action: "utils.hideModal('alert-modal')",
          class: "btn-high",
        },
      ];
      utils.callModalAlert(
        "error-site",
        "Ha ocurrido un error",
        message,
        opcAction
      );
    },
    uuidv4: function uuidv4() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    },

    dropHandler: function dropHandler(ev, id) {
      ev.preventDefault();
      var dt = new DataTransfer();      
      var multiple = $("#" + id).attr('multiple');

      if (ev.dataTransfer.items) {
        if (!multiple && ev.dataTransfer.items.length > 1) {
          return;
        }
        for (var i = 0; i < ev.dataTransfer.items.length; i++) {
          dt.items.add(ev.dataTransfer.items[i].getAsFile());
        }
      } else {
        if (!multiple && ev.dataTransfer.files.length > 1) {
          return;
        }
        for (var i = 0; i < ev.dataTransfer.files.length; i++) {
          dt.items.add(ev.dataTransfer.files[i]);          
        }
      } 
      $("#" + id)[0].files = dt.files;
      utils.loadFile(id, dt.files);
    },
    dragOverHandler: function dragOverHandler(ev, id){
      ev.preventDefault();
    },
    initInputFile: function initInputFile(id) {      
      $("#"+ id).next().append('<span class="govco-icon govco-icon-attached-n color-attach"></span>Arrastre aquÃ­ su(s) archivo(s) o haga click para aÃ±adir.');
      $("#"+ id).change(id, function (event) {
        event.stopPropagation();
        var files = $(this)[0].files;
        utils.loadFile(id, files);
        
    });
    },
    loadFile: function loadFile(id, files) {   
      var multiple = $("#" + id).attr('multiple');

      var interval = setInterval(() => {
        var len = files.length;
        for(var i = 0; i < len; i ++) {
          var file = files[i];
          var valorKb = 0;
          if (file) {
              valorKb = parseInt(file.size / 1024, 10);
          }
          file.isValid = true;
          file.url = objectURL = URL.createObjectURL(file);
          file.uuid = utils.uuidv4();
          if (file.name !== '') {
            if (!multiple) {                
              $("#" + id)
                  .attr("hidden", true)
                  .attr("disabled", true)
                  .siblings(".custom-file-label").addClass('hide').removeClass('loaded')
                  .after('<div class="tag-govco tag-negative fileItem-'+file.uuid+'">'+  file.name + ' (' + valorKb + ' kb) </span>' +
                      '<a onclick="utils.clearFile('+ i +',\''+ id + '\'' + ', \'Arrastre aquÃ­ su(s) archivo(s) o haga click para aÃ±adir.\')" class="clear-files-govco"><span class="govco-icon govco-icon-close "></span></a></div>' + 
                      '<a class="fileItem-'+file.uuid+'" onclick ="window.open(\''+ file.url +'\')" <span class="govco-icon govco-icon-tramite-close "></span></a>');
            } else {
              $("#" + id).parent().after(
                '<div class="tag-govco tag-negative fileItem-'+file.uuid+'">'+  file.name + ' (' + valorKb + ' kb) </span>' +
                '<a onclick="utils.clearFile('+ i +',\''+ id + '\'' + ', \'Arrastre aquÃ­ su(s) archivo(s) o haga click para aÃ±adir.\')" class="clear-files-govco"><span class="govco-icon govco-icon-close "></span></a></div>' + 
                '<a class="fileItem-'+file.uuid+'" onclick ="window.open(\''+ file.url +'\')" <span class="govco-icon govco-icon-tramite-close "></span></a>'
              );
            }
          }
        }
        if (multiple) {
          $("#" + id).siblings(".custom-file-label").removeClass('loaded')
          $("#spinner-loader-file").remove();
          $("#"+ id).next().append('<span class="govco-icon govco-icon-attached-n color-attach"></span>Arrastre aquÃ­ su(s) archivo(s) o haga click para aÃ±adir.');            
        }
        clearInterval(interval)
      }, 2000);

      $("#" + id)
        .siblings(".custom-file-label")
        .text('')
        .addClass('loaded')
        .append('<span id="spinner-loader-file"><div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div>Subiendo archivo(s)</span>')

    },
    clearFile: function clearFile(deleteIndex, id, label) {
      var filesDeleted = 0;
      var files = document.getElementById(id);
      var fileToDelete = files.files[deleteIndex];
      fileToDelete.isValid = false;
      for(var i = 0; i < files.files.length; i ++) {
        var file = files.files.item(i);
        if(!file.isValid){
          filesDeleted ++;
          $('div').remove('.fileItem-'+file.uuid);
        }
      }
      if(filesDeleted === files.files.length) {
        files.value = "";
        $('#'+ id)
            .removeAttr("hidden")
            .removeAttr("disabled");
        $('#'+ id)
            .siblings(".custom-file-label")
            .removeClass("hide")
            .html('<span class="govco-icon govco-icon-attached-n color-attach"></span>' + label);
      }
  },
    // Funcion que inicializa
    initAccesibilidad: function initAccesibilidad() {
      var letterMin = document.querySelector(".min-fontsize");
      var letterMax = document.querySelector(".max-fontsize");
      var mood = 1;
      var size = parseInt(getComputedStyle(document.documentElement).fontSize); //Contraste

      document
        .querySelector(".contrast-ref")
        .addEventListener("click", function (e) {
          if (mood == 1) {
            document.body.classList.add("all");
            mood++;
          } else {
            document.body.classList.remove("all");
            mood--;
          }
          e.preventDefault();
        }); //reducir letra

      letterMin.addEventListener("click", function (e) {
        if (size > 13) {
          size--;
          var font = size.toString();
          document.querySelector("html").style.fontSize = font + "px";
        }
        e.preventDefault();
      }); //Aumentar Letra

      letterMax.addEventListener("click", function (e) {
        if (size < 19) {
          size++;
          var font = size.toString();
          document.querySelector("html").style.fontSize = font + "px";
        }
        e.preventDefault();
      });
    },
    // FunciÃ³n que abre otra ventana del navegador con Url de parametro
    goTo: function goTo(url) {
      if (url.length > 0 && url != "undefined") {
        window.open(url, "_blank");
      }
    },
    // FunciÃ³n que ajusta posiciÃ³n de modal sobre main y backdrop
    configModal: function configModal() {
      // Copy modals outher main
      jQuery("#modals-content").append(jQuery(".modal"));
      jQuery(".modal").on("shown.bs.modal", function () {
        //Make sure the modal and backdrop are siblings (changes the DOM)
        jQuery(this).before(jQuery(".modal-backdrop")); //Make sure the z-index is higher than the backdrop

        jQuery(this).css(
          "z-index",
          parseInt(jQuery(".modal-backdrop").css("z-index")) + 1
        );
      });
    },
    // FunciÃ³n que ajusta posiciÃ³n de un modal especifico sobre main y backdrop
    configBackDrop: function configBackDrop(idModal) {
      jQuery("#" + idModal).on("shown.bs.modal", function () {
        //Make sure the modal and backdrop are siblings (changes the DOM)
        jQuery(this).before(jQuery(".modal-backdrop")); //Make sure the z-index is higher than the backdrop

        jQuery(this).css(
          "z-index",
          parseInt(jQuery(".modal-backdrop").css("z-index")) + 1
        );
      });
    },
    // FunciÃ³n que invoca un modal de tipo alerta
    callModalAlert: function callModalAlert(typeModal, title, message, opc) {
      var iconModal = "";

      if (jQuery(".alert-govco-maintenance").hasClass("hidden") == false) {
        jQuery(".alert-govco-maintenance").addClass("hidden");
      }

      jQuery(".alert-modal .modal-header i").show();
      jQuery(
        "#modal-content-type-alert .alert-icon #govco-icon-alert"
      ).removeClass();

      switch (typeModal) {
        case "error":
          iconModal = "govco-icon govco-icon-x-cn";
          jQuery(".alert-modal .modal-header i").hide();
          break;

        case "warning":
          iconModal = "govco-icon govco-icon-exclamation-cn";
          jQuery(".alert-modal .modal-header i").hide();
          break;

        case "success":
          iconModal = "govco-icon govco-icon-circle-check-n";
          jQuery(".alert-modal .modal-header i").hide();
          break;

        case "info":
          iconModal = "govco-icon govco-icon-circle-check-n";
          break;

        case "maintenance":
          iconModal = "govco-icon govco-icon-exclamation-cn";
          jQuery(".alert-govco-maintenance").removeClass("hidden");
          break;

        case "error-site":
          iconModal = "govco-icon govco-icon-sad-face-n";
          jQuery(".alert-modal .modal-header i").hide();
          break;

        default:
          iconModal = "govco-icon govco-icon-exclamation-cn";
      }

      jQuery(
        "#modal-content-type-alert .alert-icon #govco-icon-alert"
      ).addClass(iconModal);
      jQuery("#modal-content-type-alert").removeClass();
      jQuery("#modal-content-title").removeClass();
      jQuery("#modal-content-title").addClass(
        "modal-content-title content-govco"
      );
      jQuery("#modal-content-type-alert").addClass(
        "modal-content-" + typeModal
      );
      jQuery("#modal-content-title").addClass("modal-content-" + typeModal);
      jQuery(".alert-modal .modal-footer").html(utils.createButtonsModal(opc));
      jQuery("#modal-content-title").text(title);
      jQuery("#modal-content-txt").html(message);


      jQuery(".alert-modal").modal({
        backdrop: "static",
        keyboard: false,
      });
    },
    // Call Tooltip function
    tooltip: function () {
      $('[data-toggle="tooltip"]').tooltip();
    },

    // Calendar function
    calendar: function () {
      $('.calendar').datepicker({
        locale: 'es-es',
        dayNamesMin: ['Do','Lu','Ma','Mi','Ju','Vi','SÃ¡'],
        format: 'dd/mm/yyyy',
        uiLibrary: 'bootstrap4',
        keyboardNavigation: true,
        icons: {
          rightIcon: '<span aria-label="Abrir calendario"><i class="material-icons">date_range</i></span>'
        }
      });
    },
    // FunciÃ³n que oculta modal
    hideModal: function hideModal(idModal) {
      jQuery("." + idModal).modal("hide");
    },
    // FunciÃ³n que captura eventos de modal alert
    eventsModalAlert: function eventsModalAlert() {
      $(".alert-modal").on("hide.bs.modal", function () {
        jQuery("#modal-content-txt").text(message);
        jQuery(".alert-modal .modal-footer").html("");
      });
    },
    // FunciÃ³n que crea HTML de listado de botones
    createButtonsModal: function createButtonsModal(listOpc) {
      var footer = "";
      listOpc.forEach(function (item) {
        footer +=
          '<button type="button" class="btn btn-round btn-modal ' +
          item.class +
          '"';
        footer += 'onclick="' + item.action + '">' + item.text + "</button>";
      });
      return footer;
    },

    // Funcion para obtener la url del servidor actual 
    getServerWebUrl: function (concatStr) {
      return window.location.origin + concatStr;
    },

    // Funcion viewportLink se genera una ventana con un tamÃ¡Ã±o de 500x600
    viewportLink: function (href) {
      window.open(href, '', 'resizable=no,status=no,location=no,toolbar=no,menubar=yes,fullscreen=no,scrollbars=no,dependent=no,width=500,height=600');
    },
    //show password, using checkbox
    showPasswordCheckbox: function (inputPassID, checkboxID) {
      var inputPass = document.getElementById(inputPassID);
      var checkPass = document.getElementById(checkboxID);
      checkPass.addEventListener('change', function () {
        if (this.checked) {
          inputPass.type = "text";
        }
        else {
          inputPass.type = "password";
        }
      });
    },
    // FunciÃ³n que abre otra ventana del navegador con Url de parametro
    modalGoTo: function modalGoTo(url, idModal) {
      utils.hideModal(idModal);
      utils.goTo(url);
    },
    // Evento de clic sobre componente collapse
    collapseOnClick: function collapseOnClick(classComponent, idLoop) {
      var state = jQuery("#item-" + idLoop).attr("aria-expanded");
      jQuery("." + classComponent + " .lbl-minus").hide();
      jQuery("." + classComponent + " .icon-minus").hide();
      jQuery("." + classComponent + " #title-entity-" + idLoop).show();
      jQuery(".content-" + classComponent + " .icon-add").show(100);
      jQuery("#title-" + idLoop).show(200);

      if (state == "false") {
        jQuery("#item-" + idLoop + " .lbl-minus").show(200);
        jQuery("#item-" + idLoop + " .icon-minus").show(200);
        jQuery("#item-" + idLoop + " #icon-add-" + idLoop).hide(200);
        jQuery(
          "." +
          classComponent +
          " .title-entity-" +
          classComponent +
          ":not(#title-entity-" +
          idLoop +
          ")"
        ).hide(200, function () { });
        jQuery(
          "." + classComponent + " .collapse-title:not(#item-" + idLoop + ")"
        ).addClass("pb-2");
      } else {
        jQuery("#item-" + idLoop + " .lbl-minus").hide();
        jQuery("#item-" + idLoop + " .icon-minus").hide();
        jQuery(".title-entity-" + classComponent).show(200);
        jQuery(
          "." + classComponent + " .title-entity-" + classComponent
        ).show(200, function () { });
        jQuery("." + classComponent + " .collapse-title").removeClass("pb-2");
      }
    },
    callModal: function callModal(type) {
      jQuery(".govco-modal-" + type).modal({
        backdrop: "static",
        keyboard: false,
      });
    },
    // FunciÃ³n de evento para activar evento scroll y sus interacciones
    scrollHeader: function scrollHeader() {
      var scrollOffset = jQuery(document).scrollTop();
      var firstMenu = document.getElementsByClassName("nav-primary")[0];
      var secondMenu = document.getElementsByClassName("nav-secondary")[0];
      var itemFirstMenu = document.getElementsByClassName(
        "nav-item-primary"
      )[0];
      var searchNavbar = document.getElementsByClassName("search-navbar")[0];

      if (firstMenu != undefined && secondMenu != undefined) {
        // Valida la posiciÃ³n del scroll para activar/inactivar animaciÃ³n
        if (scrollOffset < 300) {
          utils.initValueScroll();
        } else {
          firstMenu.classList.remove("hidden-transition");
          secondMenu.classList.remove("show-transition");

          if (firstMenu.classList.contains("show-transition") === false) {
            firstMenu.classList.add("show-transition");
            itemFirstMenu.classList.remove("is-scroll");
          }

          if (secondMenu.classList.contains("hidden-transition") === false) {
            secondMenu.classList.add("hidden-transition");
          }

          if (searchNavbar.classList.contains("translation") === false) {
            searchNavbar.classList.add("translation");
            searchNavbar.classList.remove("non-translation");
          }
        }
      }
    },
    // FunciÃ³n para asignar valores iniciales a la animaciÃ³n de segundo menÃº
    initValueScroll: function initValueScroll() {
      var firstMenu = document.getElementsByClassName("nav-primary")[0];
      var secondMenu = document.getElementsByClassName("nav-secondary")[0];
      var itemFirstMenu = document.getElementsByClassName(
        "nav-item-primary"
      )[0];
      var searchNavbar = document.getElementsByClassName("search-navbar")[0];

      if (firstMenu != undefined && secondMenu != undefined) {
        if (firstMenu.classList.contains("hidden-transition") === false) {
          itemFirstMenu.classList.add("is-scroll");
          firstMenu.classList.add("hidden-transition");
          firstMenu.classList.remove("show-transition");
        }

        if (secondMenu.classList.contains("show-transition") === false) {
          secondMenu.classList.remove("hidden-transition");
          secondMenu.classList.add("show-transition");
        }

        if (searchNavbar.classList.contains("translation")) {
          searchNavbar.classList.remove("translation");
          searchNavbar.classList.add("non-translation");
        }
      }
    },
    // Header Nvl 2: FunciÃ³n para activar la animaciÃ³n de bÃºsqueda
    searchFocus: function searchFocus() {
      var searchBar = document.getElementsByClassName("form-search-bar")[0];
      searchBar.classList.add("form-search-bar-active");
    },
    // Header Nvl 2: FunciÃ³n para ocultar la animaciÃ³n de bÃºsqueda
    searchOutFocus: function searchOutFocus() {
      var searchBar = document.getElementsByClassName("form-search-bar")[0];
      searchBar.classList.remove("form-search-bar-active");
    },
/* Funcionalidad de componente teclado */
    outInputPassword: function outInputPassword() {
      if (!this.isMobile()) {
        var kb = document.getElementById("keyboard");
        if (this.wasInside) {
          kb.classList.remove("show");
        }
        this.wasInside = false;
      }
    },

    onInputPassword: function onInputPassword() {
      if (!this.isMobile()) {
        var kb = document.getElementById("keyboard");
        kb.classList.add("show");
        this.wasInside = true;
      }
    },

    isMobile: function isMobile() {
      var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      return isMobile;
    },

    clearTeclado: function clearTeclado() {
      var inputTeclado = document.getElementsByClassName(
        "teclado-password"
      )[0];
      inputTeclado.value = "";
    },

    initTeclado: function initTeclado() {
      var inputTeclado = document.getElementsByClassName(
        "teclado-password"
      )[0];
      inputTeclado.classList.add('pass-type');
      if (!this.isMobile()) {
        inputTeclado.setAttribute("onKeyDown", "return false");
      } else {
        inputTeclado.setAttribute("type", "tel");
      }
      var tecladoValue = "";
      $(".td-number-item")
        .unbind()
        .click(function (e) {
          var inputTeclado = document.getElementsByClassName(
            "teclado-password"
          )[0];
          inputTeclado.classList.add('pass-type');
          if (inputTeclado.value === "") {
            tecladoValue = e.target.value;
          } else {
            tecladoValue += e.target.value;
          }

          inputTeclado.value = tecladoValue;
        });
      $(".btn-delete-teclado")
        .unbind()
        .click(function (e) {
          utils.clearTeclado();
        });
    },
    getValueTeclado: function getValueTeclado() {
      this.outInputPassword();
      var inputTeclado = document.getElementsByClassName("teclado-password")[0];
      var tecladoValue = JSON.parse(JSON.stringify(inputTeclado.value));
      inputTeclado.value = "";
      return tecladoValue;
    },

/* end uncionalidad de componente teclado */
    scrollToTopCDN: function scrollToTopCDN(div) {
      $(div).animate(
        {
          scrollTop: 0,
        },
        "fast"
      );
    },
    mergeObjects: function asignObects(objs) {
      result = objs.reduce(function (r, o) {
        Object.keys(o).forEach(function (k) {
          if (typeof o[k] !== "undefined") {
            r[k] = o[k];
            // console.log( k, o[k])
          }
        });
        return r;
      }, {});
      return result;
    },
    setConfigTable: function setConfigTable(configTable) {
      var defaultConfigTable = {
        pagingType: "simple_numbers",
        responsive: true,
        info: false,
        lengthChange: false,  
        language: {
          emptyTable: "No se encontraron registros",
          zeroRecords: "No se encontraron registros coincidentes",
          paginate: {
            previous: 'Anterior',
            next: 'Siguiente',
          },
        },
      };

      var $config = Object.assign(defaultConfigTable, configTable, { language: Object.assign(defaultConfigTable.language, configTable.language) });

      var $columnState = $('.table-state');
      var columnNorOrdering = ($columnState.length > 0) ?  { orderable: false, targets: $columnState.parent().children().index($columnState) }: undefined;
      if (columnNorOrdering) {
        $config.columnDefs= [ columnNorOrdering ]
      }
      $.fn.dataTable.ext.search.push(
        function( settings, data, dataIndex ) {
          
          var valueFilter = $("#" + configTable.idSelector + " .dropdown-item.active").attr('value');
          var indexColumn = $('.table-state').parent().children().index($('.table-state'));
          var state = data[indexColumn];
          if ( !valueFilter || valueFilter === state) {
            return true;
          }
          return false;
        }
    );
    
      $("#".concat($config.idSelector)).DataTable($config);
      $('#' + $config.idSelector +'_filter').remove();

      var $contentTableAndCtrls = $('#' + $config.idSelector).closest('div.table-pagination-govco');
      
      var $footerTable = $contentTableAndCtrls.find('.content-footer-table');
      var $ctrlsActions = $footerTable.find('.content-ctrls');
      var $notePie = $footerTable.find('.footer-note');
      var $paginate = $('#' + $config.idSelector +'_paginate');
      if ($ctrlsActions) {
        $paginate.insertAfter($ctrlsActions);
      } else if($notePie) {
        $paginate.insertBefore($notePie);
      }else{
        $footerTable.append($paginate);
      }
      $footerTable.insertAfter('#' + $config.idSelector);

      $contentTableAndCtrls.find('.filter-column').on('changed.bs.select', function (e, clickedIndex, isSelected, previousValue) {
        var searchValue = $contentTableAndCtrls.find('.input-search').val();
        var columnsSearch = $(this).selectpicker('val');
        console.log(searchValue, columnsSearch);
      });
      
      $contentTableAndCtrls.find('.input-search').on('keyup', function () {
        var columnsSearch = $contentTableAndCtrls.find('.filter-column').selectpicker('val');
        console.log(columnsSearch);
        var tableFilter = $("#".concat(configTable.idSelector)).DataTable();
        tableFilter.search( this.value ).draw();
      })


      $("#" + configTable.idSelector + " .dropdown-toggle").on('click', function () {
        $("#" + configTable.idSelector + " .dropdown-item").removeClass('active');
        var tableFilter = $("#".concat(configTable.idSelector)).DataTable();
        tableFilter.draw()
      });
      $("#" + configTable.idSelector + " .dropdown-item").on('click', function () {
        $(this).addClass('active');
        var tableFilter = $("#".concat(configTable.idSelector)).DataTable();
        tableFilter.draw()
      });
      $(".action-table.action-see").on('click', function () {
        var table = $("#".concat(configTable.idSelector)).DataTable();
        var tr = $(this).closest('tr');
        var row = table.row( tr );
        var activeCollapse =  $(this).text('ver menos').attr('href');

        if ( row.child.isShown() ) {
          $(this).text('ver mÃ¡s').closest('td').append($("#" + configTable.idSelector + " " + activeCollapse));
          row.child.hide();
          tr.removeClass('shown');
          
        }
        else {
            row.child( $("#" + configTable.idSelector + " " + activeCollapse) ).show();
            tr.addClass('shown');
            $(this).text('ver menos');
        }
        return false;
      });
      if (configTable.see) {
        var table = $("#".concat(configTable.idSelector)).DataTable();
        var tr = $(".action-table.action-see").closest('tr');
        var row = table.row( tr );
        var activeCollapse =  $(".action-table.action-see").text('ver menos').attr('href');

        if ( row.child.isShown() ) {
          $(".action-table.action-see").text('ver mÃ¡s').closest('td').append($("#" + configTable.idSelector + " " + activeCollapse));
          row.child.hide();
          tr.removeClass('shown');
          
        }
        else {
            row.child( $("#" + configTable.idSelector + " " + activeCollapse) ).show();
            tr.addClass('shown');
            $(".action-table.action-see").text('ver menos');
        }
      }
    },
    removeTag: function removeTag() {
      $(".gov-co-label .govco-icon-close").on("click", function (e) {
        $(this).parent().remove();
      });
    },
    //Hide component BackToTop
    onWindowScroll: () => window.addEventListener('scroll', function(){
      var objBackTop = document.querySelector(".scroll-to-top");
      if ((window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop) > 100) {
        windowScrolled = true;
        objBackTop.classList.add("show-scrollTop");
      } else if ((this.windowScrolled && window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop) < 10) {
        objBackTop.classList.remove("show-scrollTop");
      }
    }),
    //BacktoTop
    scrollToTop: function () {
      (function smoothscroll() {
        let currentScroll = document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset;
        if (currentScroll > 0) {
          window.requestAnimationFrame(smoothscroll);
          window.scrollTo(0, currentScroll - (currentScroll / 8));
          if (currentScroll < 20) {
            window.scrollTo(0, 0);
            document.documentElement.scrollTop = 0;
            //this.windowScrolled = false;
          }
        }
      })();
      event.preventDefault();
    },
    blurredBackgroundModal: function () {
      window.document.querySelectorAll('body.modal-open .container-fluid').forEach(function (el) {
        el.style.filter = "blur(15px)";
      })
    },
    sharpenBackgroundModal: function () {
      window.document.querySelectorAll('body.modal-open .container-fluid').forEach(function (el) {
        el.style.filter = "none";
      })
    }
  };
})();

jQuery(function () {
  utils.init(); ///Evento para el input del buscador del header

  jQuery("#input-buscador-header, #input-buscador-header-mobile").on(
    "keyup",
    function (e) {
      if (e.which == 13) {
        var filtro = jQuery(this).val();
        RedirectBuscadorConFiltro(filtro);
      }
    }
  );
  jQuery("#input-buscador-header_btn-search").on("click", function (e) {
    var filtro = jQuery("#input-buscador-header").val();
    RedirectBuscadorConFiltro(filtro);
  }); //Funcionalidad back to top
  
  var backToTopButton = document.querySelector(".btn-up-hover-clone");

  if (backToTopButton != null) {
    window.addEventListener("scroll", function () {
      if (window.pageYOffset > 300) {
        backToTopButton.classList.add("show"); //fade in

        backToTopButton.style.display = "block";
        backToTopButton.classList.remove("hide");
      } else {
        backToTopButton.classList.add("hide"); //fade out

        backToTopButton.classList.remove("show");
      }

      backToTopButton.addEventListener("click", function () {
        window.scrollTo(0, 0);
      });
    });
  }
});

function RedirectBuscadorConFiltro(filtro) {
  if (filtro) window.location.href = "/buscador?busqueda=" + filtro;
}