function anchor(id, tbl){
      if (tbl =="")
      {
	      eee = "body";
	      destination = $("a[name='anh"+id+"']").position().top;

	      src = $(window).height() + destination;
	      if ($(document).height() < src)
	      {
	      	$("#pustota").height($(window).height());
	      }

		  $(eee).animate({ scrollTop: destination}, 1100 );
		  return false;
		}
		else
		{				eee = "body";
		      destination = $("#"+tbl).position().top;

		      src = $(window).height() + destination;
		      if ($(document).height() < src)
		      {
		      	$("#pustota").height($(window).height());
		      }

			  $(eee).animate({ scrollTop: destination}, 1100 );
			  return false;
		}


}

function message_form(type,message)
{
	if (type=="inf")
	{
		$('#mes').html('<div class=\"ui-widget\"><div class=\"ui-state-highlight ui-corner-all\" style=\"padding: 0 .7em;\"><p id=\"mes-cont\" style=\"font-weight: normal; \"><span class=\"ui-icon ui-icon-info\" style=\"float: left; margin-right: .3em;\"></span><strong>Информация:</strong>&nbsp;</p></div></div>');
	}
	else
	{		$('#mes').html('<div class=\"ui-widget\"><div class=\"ui-state-error ui-corner-all\" style=\"padding: 0 .7em;\"><p id=\"mes-cont\" style=\"font-weight: normal; \"><span class=\"ui-icon ui-icon-alert\" style=\"float: left; margin-right: .3em;\"></span><strong>Ошибка:</strong>&nbsp;</p></div></div>');
	}

	$('#mes').css("display", "block");
	$( '#mes' ).scrollFollow();
	$('#mes').width($(window).width()-20);
	$('#mes-cont').append(message);
	$('#mes').oneTime("5s", function() {
   		$('#mes').slideUp('slow');
   	});
}

function CheckSin(val,id_p)
{
	if (val!=""){
	$.ajax({
			   type: "GET",
			   url: "function/fun_menu.php",
			   async: false,
			   data: {sinonim: val, id: id_p},
			   success: function(data){
			     	if (data==1)
			     	{
			     		rrr = "<font color=\"#ff4242\">Синоним занят</font>";
					}
					else
					{						rrr = "<font color=\"green\">Синоним свободен</font>";
					}
					$('#checkSin').html(rrr);
			   }
			 });
	}
	else
	{		$('#checkSin').html("");
	}
}
