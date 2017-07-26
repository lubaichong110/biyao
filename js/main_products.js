require.config({//配置main_index.js所依赖的模块
	paths:{
		"jquery":"jquery-1.11.3",
		"fnMoudle":"fnMoudle",
		"cookie":"jquery.cookie"
	}
})
require(["jquery"],function($){
	require(["cookie","fnMoudle"],function(cookie,fnMoudle){
		$(".code").load("../data/data.html .sharCode",function(){
			fnMoudle.code();
			//fnMoudle.menu();
		});
	    $(".top").load("../data/data.html header",function(){
	    	fnMoudle.logStatus();
	    	loadCart();
	    });
		$(".nav_fixed").load("../data/data.html .nav");
        $(".bottom").load("../data/data.html footer");
        
        $(function(){
        	var shop_index =$.cookie("shop_index")
        	if(shop_index<0){
        	   shop_index=0;
    		}
        	var product_id= $.cookie("product");//获取要加载的商品id
        	$.getJSON("../data/shopList.json",function(res){
        		var data =res[shop_index].obj;//获取商品类型数据
        		var str ="";
        		for(var i=0;i<data.length;i++){
        		    for(var j=0;j<data[i].obj.length;j++){
        		    	if(data[i].obj[j].id==product_id){//获取到对应id的商品信息
        		    		console.log(data[i].obj[j].show_img)
        		    		//shangfang>
        		    		$(".bread-title").html("&gt;&nbsp;"+data[i].obj[j].info)
        		    		//主标题信息
        		    		var str_id=`
        		    		<h1 data-good-id="`+data[i].obj[j].id+`">`+data[i].obj[j].info+`</h1>
        		    		<p></p>
        		    		`
        		    		$(".panel-top").append(str_id);
        		    		//大图片
        		    		$(".editor-picture p img").attr("src",data[i].obj[j].show_img[0]);
        		    		//副标题信息
        		    		$(".panel-top p").html(data[i].obj[j].sub_info);
        		    		//价格
        		    		$(".panel-money i").html(parseInt(data[i].obj[j].price))
        		    		//show_img
        		    		var str_show="";
        		    		$.each(data[i].obj[j].show_img, function(a,b) {
        		    			str_show+=`
        		    			    <li><img src="`+b+`" alt="" /></li>
        		    			`
        		    		})
        		    		$(".show_img").append(str_show);
      		    		    //color_img
      		    		    var str_color="";
        		    		$.each(data[i].obj[j].color_img,function(a,b){
        		    			str_color+=`
        		    			    <li class="color">
					    				<img src="`+b+`" alt="" />
					    			    <em>	</em>
					    			    <i></i>
					    			    <div class="choose_color">深灰色</div>
					    			</li>
        		    			`
        		    		})
        		    		$(".color_div ul").append(str_color);
        		    		
        		    		//size
        		    		var str_size ="";
        		    		$.each(data[i].obj[j].size,function(a,b){
        		    			str_size+=`<li >`+b+`<em></em></li>`;
        		    		})
        		    		$(".size_div ul").append(str_size);
        		    		//页面效果加载
        		    		loadJs();
        		    	}
        		    }
        		}
        	})
        	
        	function loadJs(){
        		        var $lis =$(".editor-picture ul li");//li
				        for(let i=0;i<$lis.length;i++){
				        	$lis.eq(i).click(function(){
				        		$(".editor-picture p img").attr({src:$(this).find("img").attr("src")});
				        	})
				        }
				        //右侧小图
				        var $color =$(".color");
				        for(var i=0;i<$color.length;i++){
				        	
				        	$color.eq(i).click(function(){
				        		for(var i=0;i<$color.length;i++){
				        			$color.eq(i).find("em").css("display","none");
				        			$color.eq(i).css({border: "1px solid #ccc"})
				        		}
				        		$(".editor-picture p img").attr({src:$(this).find("img").attr("src")});
				        		$(this).find("em").css("display","block");
				        		$(this).addClass(".color_active")
				        	})
				        	$color.eq(i).mouseover(function(){
				        		$(this).find(".choose_color").css("display","block");
				        	})
				        	$color.eq(i).mouseleave(function(){
				        		$(this).find(".choose_color").css("display","none");
				        	})
				        }
				        //size
				        var $size = $(".size ul li");
				        for(var i=0;i<$size.length;i++){
				        	$size.eq(i).click(function(){
				        		for(var i=0;i<$size.length;i++){
				        			$size.eq(i).find("em").css("display","none");
				        			$size.eq(i).css({border: "1px solid #ccc"})
				        		}
				        		$(this).find("em").css("display","block");
				        		$(this).addClass(".size_active");
				        	})
				        }
				        //-
				        $(".panel-minus").click(function(){
				        	if($(".panel-number").text()>1){
				        		$(".panel-number").text($(".panel-number").text()-1)
				        	}
				        })
				        //+
				        $(".panel-add").click(function(){
				        	$(".panel-number").text(Number($(".panel-number").text())+1)
				        })
				        
				        
				        
				        //购物车提交
				        $("#addShopCar").click(function(){
				        	$(".color_active .choose_color").css("display","block");
				        	var goodId =$(".panel-top h1").attr("data-good-id");
				        	var goodName =$(".panel-top h1").html();
				        	var goodColor =""+$(".color .choose_color").html()+"";
				        	var goodPrice=Number($(".panel-money i").html());
				        	var goodNum =Number($(".panel-number").text());
				        	var goodSrc = $(".editor-picture p img").attr("src");
				        	//获取cookie
				            var cartStr = $.cookie("cart") ? $.cookie("cart") : "";
				            var cartObj = convertCartStrToObj(cartStr);
				            console.log(goodColor)
				            //判断该商品是否已经在购物车中存在
									if(goodId in cartObj){
										//如果已存在，那么该商品的数量加1
										cartObj[goodId].num += 1;
									}else{
										//如果不存在，那么将新商品的信息存入
										cartObj[goodId] = {
											name : goodName,
											price : goodPrice,
											num : goodNum,
											src : goodSrc,
											color : goodColor
										};
									}
						    
				            cartStr = convertObjToCartStr(cartObj);
				            console.log(cartStr)
				            $.cookie("cart",cartStr,{expires : 7,path:"/"});
				            loadCart();
				        	location.href="http://localhost/JS/biyao/html/shopCar.html";
				       })
				        
				        //sup_logo
				        $(".sup_logo").mouseenter(function(){
				        	$(this).find("div").css("display","block");
				        })
				        $(".sup_logo").mouseleave(function(){
				        	$(this).find("div").css("display","none");
				        })
				        
				        //选项卡
				        $(".view_title ul li").eq(0).click(function(){
				        	$(".view_detail").css("display","block")
				        	$(".view_comment").css("display","none")
				        })
				        $(".view_title ul li").eq(1).click(function(){
				        	$(".view_detail").css("display","none")
				        	$(".view_comment").css("display","block")
				        })
        		
        	}

        })
           
           			//加载购物车中的信息（使商品页与购物车页中的购物车数量同步）
			function loadCart(){
				var cartStr = $.cookie("cart") ? $.cookie("cart") : "";
					var cartObj = convertCartStrToObj(cartStr);
					//获取到购物车中所有商品的数量
					var total = 0;
					for(var id in cartObj){
						total += cartObj[id].num;
					}
					$("#shopCar").html(total);
			}


			function convertCartStrToObj(cartStr){
				//"sp1,香蕉,30,1,src1:sp2,苹果,40,2,src2:sp3,梨,50,3,str3"
				//如果是空字符串，即没有购物车信息，那么购物车为空，直接返回一个空对象
				if(!cartStr){
					return {};
				}
				var goods = cartStr.split(":");
				var obj = {};
				for(var i = 0; i < goods.length; i ++){
					var data = goods[i].split(",");
					//以商品的id为健，商品的其他信息为值，这个值也设计为一个对象
					obj[data[0]] = {
						name : data[1],
						price : parseFloat(data[2]),
						num : parseInt(data[3]),
						src : data[4],
						color :data[5]
					}
				}
				return obj;
			}
			function convertObjToCartStr(obj){
					var cartStr = "";
					//遍历对象
					for(var id in obj){
						if(cartStr){
							cartStr += ":";
						}
						//"sp1,香蕉,30,1,src1:sp2,苹果,40,2,src2:sp3,梨,50,3,str3"
						cartStr += id + "," + obj[id].name + "," + obj[id].price + "," + obj[id].num + "," + obj[id].src+ "," + obj[id].color;
					}
					return cartStr;
			}












	})
})