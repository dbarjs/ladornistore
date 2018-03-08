function carrega_vitrine(titulo){
  if(vitrine.produtos.length){
    var div = $("<div class='ProdutoVitrine'></div>")
    div.append('<h2 id="id_titulo_vitrine">'+titulo+'</h2>');
    var div_ul = $("<ul></ul>");
    for(var cont =0; cont< vitrine.produtos.length ; cont++){
      div_ul.append(monta_html_item( cont));


    };
    div.append(div_ul);
    div.append('<div style="clear:both;"></div>');
    div.append('<div class="EspacoRodape"> &nbsp; </div>');

    $('#id_Vitrine').html("");
    $('#id_Vitrine').append(div);
  }else{
    if(window.location.pathname =='/consulta.php' || window.location.pathname =='/consulta_avancada.php' ){
      $('#id_Vitrine').html("<div id='div_principalVitrine' class='titulo1' style='width:100%; '>"+
        'Sua consulta n�o obteve resultado.'+
        "</div>");
      //� consulta
      $('#id_Vitrine').append("<div style='width:100%; '>"+
        'Certifique-se de que todas as palavras estejam escritas corretamente.<BR>'+
        'Tente palavras-chave mais gen�ricas.<BR>'+
        '</div>');
    }

  }

}
function url_imagem(arquivo){
  if(arquivo.indexOf("arquivos_loja")== -1){//ainda n�o esta atualizada o json, apagar if ap�s atualiza��o
    return 'arquivos_loja/'+vitrine.caracteristica.cod_loja+'/'+arquivo;
  }
  return arquivo;
}
function monta_html_item(cont){
  /***************************************************************************
   ************************* ITENS DE PRODUTOS ********************************
   ****************************************************************************/
  var div_produto = $('<li></li>');
  var div_p_unico = $('<div class="produto_unico"></div>');
  var div_url = $('<a href="'+ url_amigavel_produto(vitrine.produtos[cont].codigo,vitrine.produtos[cont].titulo)+'"></a>');
  var div_nome = $('<div class="ProdutoTxt">'+vitrine.produtos[cont].nome+'</div>');

  var div_imagem ='';
  if(vitrine.produtos[cont].foto1!=''){
    div_imagem = $('<div class="produtoImg lista_produto"><img class="lista_produto" src="'+url_imagem(vitrine.produtos[cont].foto1)+'" alt="'+vitrine.produtos[0].nome+'" align="bottom"><br></div>');
  }else{
    div_imagem = $('<div class="produtoImg lista_produto"><img class="lista_produto" src="'+servidor_imagem+'arquivos/indisponivel_n.png" width="'+vitrine.caracteristica.tamanho_img+'"  align="bottom"><br></div>');
  }


  /************************** VALORES ************************/
  var div_valor = $('<div class="preco"></div>');
  if(vitrine.caracteristica.pode_ver_valores==1){//pode ver valores
    if(vitrine.produtos[cont].valor>0){
      if(vitrine.produtos[cont].valor_promocao>0){ //valor promocional
        div_valor.append('<p class="valor-por valor-de">De R$ '+FormataReal(vitrine.produtos[cont].valor)+'</p><p class="valor-por">Por R$ <span>'+FormataReal(vitrine.produtos[cont].valor_promocao)+'</span></p>');
        valor = vitrine.produtos[cont].valor_promocao;
      }else{ //valor normal
        div_valor.append('<p class="valor-por">R$ '+FormataReal(vitrine.produtos[cont].valor)+'</p>');
        valor = vitrine.produtos[cont].valor;
      }
      if(vitrine.caracteristica.desconto.forma_pagamento!=''){
        div_valor.append('<p class="valor-desconto">Ou <span> R$ '+ FormataReal(vitrine.caracteristica.desconto.f_mutiplicacao * valor) +'</span> com ' + vitrine.caracteristica.desconto.forma_pagamento + '</p>');
      }
      if(vitrine.produtos[cont].valor_parcelado!=''){//tem parcelamento
        div_valor.append('<p class="valor-dividido"><span>'+ vitrine.produtos[cont].valor_parcelado+'</span></p>');
      }
    }else{//sob consulta
      div_valor.append('<p class="consulta">Sob Consulta</p>')
    }

  }else{ //n�o pode ver valores
    div_valor.append("<a href='login.php' target='_self'>Pre�o dispon�vel s� para cliente!</a>");
  }


  /************************** BOTOES ************************/
  var div_botoes_principal = $('<div class="btnComprar" align="center"></div>');
  var div_botoes = $('<div class="BotoesVit" titulo="'+vitrine.produtos[cont].titulo+'" cod_produto="'+vitrine.produtos[cont].codigo+'"></div>');
  if(vitrine.caracteristica.pode_ver_valores==1){//pode ver valores
    if(vitrine.produtos[cont].valor>0){
      if(vitrine.produtos[cont].status=='1'){ //ativo
        if(vitrine.caracteristica.exibir_botao_comprar==1){
          div_botoes.append('<input type="button" value="Comprar" class="botao bot_comprar_vit"  />');
        }
        if(vitrine.caracteristica.exibir_botao_compra_rapida==1){
          div_botoes.append('<input type="button" value="Compra R�pida" class="botao bot_compra_rapida" />');
        }

      }else{ //inativo
        div_botoes.append('<img src="arquivos/imagens_padroes/'+ vitrine.caracteristica.cor_template +'btn_indisponivel1.png" border="0" />');
      }
    }else{//sob consulta
      div_botoes.append('<input type="button" value="Solicitar Cota��o" class="botao bot_solicitar_cotacao_vit" />')
    }
  }
  if(vitrine.caracteristica.exibir_botao_resumo=="1")
    div_botoes.append('<input type="button" value="Resumo"  class="botao bot_resumo" />')

  if(vitrine.caracteristica.exibir_botao_detalhe=="1")
    div_botoes.append('<input type="button" value="Detalhe" class="botao bot_detalhe" />')

  if(vitrine.produtos[cont].exibir_frete_gratis=="Sim")
    div_botoes.append('<img src="arquivos/imagens_padroes/'+ vitrine.caracteristica.cor_template +'bot_frete_gratis1.png" border="0" />');

  div_botoes_principal.append(div_botoes);

  /************************** Veja Mais ************************/
  var div_v_mais = $('<div class="mais visible-xs visible-sm"></div>');
  var div_p_mais = $('<p onclick="toggleMais(this)">Veja Mais</p><a href="'+ url_amigavel_departamento(vitrine.produtos[cont].cod_departamento,vitrine.produtos[cont].departamento)+'"><span>> </span>'+vitrine.produtos[cont].departamento+'</a><a href="'+ url_amigavel_categoria(vitrine.produtos[cont].cod_categoria,vitrine.produtos[cont].categoria)+'"><br><span>> </span>'+vitrine.produtos[cont].categoria+'</a>');
  div_v_mais.append(div_p_mais);


  div_produto.append(div_p_unico);
  div_p_unico.append(div_url, div_v_mais, div_botoes_principal);
  div_url.append(div_nome, div_imagem, div_valor);


  return div_produto;
}

function toggleMais(e) {
  var parentEl = $(e).parents('li');
  parentEl.toggleClass('active');

  console.log($(e).find('i'))
  if(parentEl.hasClass('active')) {
    $(e).text('Veja Menos');
    //$(e).find('i').replaceWith('<i class="material-icons">&#xE316;</i>');
  } else {
    $(e).text('Veja Mais');
    //$(e).find('i').replaceWith('<i class="material-icons">&#xE313;</i>');
  }
}

IgualarProdutos = function(alinhamento){
  /*
  **** n�o deve ser usada a funcao ****

  var	altura_maxima = 0;
  $(alinhamento).height("auto");
  $(alinhamento).each(function() {
    if( $(this).height()>altura_maxima)
      altura_maxima = $(this).height();

  });
  $(alinhamento).height(altura_maxima);
  */

}



