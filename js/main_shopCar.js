require.config({//配置main_index.js所依赖的模块
	paths:{
		"jquery":"jquery-1.11.3",
		"fnMoudle":"fnMoudle",
		"cookie":"jquery.cookie"
	}
})
require(["jquery"],function($){
	require(["cookie","fnMoudle"],function(cookie,fnMoudle){
	    $(function(){
	   	$(".top").load("../data/data.html header",function(){
			fnMoudle.logStatus();
			loadCart()
		});
        $(".bottom").load("../data/data.html footer");
        
        console.log($.cookie("cart"))
        //取出在cookie中存的购物车信息
		var cartStr = $.cookie("cart") ? $.cookie("cart") : "";
        
        if(!cartStr) {
					$("").css({
						display: "block"
					});
				} else {
					var cartObj = convertCartStrToObj(cartStr);
					//遍历所有的商品生成html添加到购物车列表中去
					for(var id in cartObj) {
						//商品信息对象
						var good = cartObj[id];
			var str = `
				<div class="shopping_box" data-good-id=`+id+`>
				<div class="order_title">
					<i class="chooseAll"></i>
					<span>商家：</span>
					<span>亓口男装</span>
				</div>
				<table class="order_main" cellspacing="0" cellpadding="0">
					<tbody>
						<tr>
							<td><i class="chooseAll"></i></td>
							<td>
								<span>
									<a href="#"><img src="../img/shop1_1_ (1)_a.jpg"/></a>
								</span>
							</td>
							<td>
								<a href="#">`+good.name+` </a>
								<br />
								<div>
									颜色:`+good.color+`<br />尺寸:S
								</div>
							</td>
							<td>¥`+good.price+`</td>
							<td>
								<i class="minus"></i>
								<input type="text" value="`+good.num+`" />
								<i class="add"></i>
							</td>
							<td>
								<span>普通包装</span>
								<span>(免费)</span>
							</td>
							<td class="zongjia">¥`+good.price*good.num+`</td>
							<td><a href="#" class="del"></a></td>
						</tr>
					</tbody>
				</table>
			</div>
						`
						//将上面的结构添加到cartList中去
						$(str).appendTo(".shop");
					}
					$(".zongjia").html("¥"+good.price*good.num);
					$(".jianshu").html(good.num)
				}
        
        //删除按钮
        			//给每个商品添加从购物车删除的事件
					$('.del').click(function() {
						//在页面上将商品信息删除，顺便获取一个该商品的id
						var id = $(this).parents('.shopping_box').remove().attr("data-good-id");
						//从cookie中将该商品删除
						var cartStr = $.cookie("cart") ? $.cookie("cart") : "";
						var cartObj = convertCartStrToObj(cartStr);
						delete cartObj[id];
						//将新商品信息放回cookie
						$.cookie('cart', convertObjToCartStr(cartObj), {
							expires: 7,
							path: "/"
						});
						loadCart()
						$(".zongjia").html("¥"+0);
					    $(".jianshu").html(0)
					})
        
        //全选按钮
        for(i in $(".chooseAll")){
        	$(".chooseAll").eq(i).click(function(){
		        	$(".chooseAll").toggleClass("all_choose");
		        	$(".chooseAll").css("background","url(../img/commonSprite.png) no-repeat -20px -80px");
		       })
        }
        //减
       $(".minus").click(function(){
       	     var id = $(this).parents('.shopping_box').attr("data-good-id");
			var cartStr = $.cookie("cart") ? $.cookie("cart") : "";
			var cartObj = convertCartStrToObj(cartStr);
			if(cartObj[id].num > 1){ //商品数量减少不能少于1
				cartObj[id].num -= 1;
				//将页面上显示的数量减1
				$(this).siblings("input").val("" + cartObj[id].num);
				//更新页面上的小计
				$(".zongjia").html(cartObj[id].num * cartObj[id].price + "");
				//将信息放回cookie
				$.cookie('cart', convertObjToCartStr(cartObj), {
					expires: 7,
					path: "/"
				});
				$(".jianshu").html(cartObj[id].num);
				loadCart()
			}
       })
       //加
       $(".add").click(function(){
       	     var id = $(this).parents('.shopping_box').attr("data-good-id");
			var cartStr = $.cookie("cart") ? $.cookie("cart") : "";
			var cartObj = convertCartStrToObj(cartStr);
				cartObj[id].num += 1;
				//将页面上显示的数量减1
				$(this).siblings("input").val("" + cartObj[id].num);
				//更新页面上的小计
				$(".zongjia").html(cartObj[id].num * cartObj[id].price + "");
				//将信息放回cookie
				$.cookie('cart', convertObjToCartStr(cartObj), {
					expires: 7,
					path: "/"
				});
				$(".jianshu").html(cartObj[id].num);
				loadCart()
       })
        
        
	    })//$
	    
	    	 function convertCartStrToObj(cartStr){
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
						cartStr += id + "," + obj[id].name + "," + obj[id].price + "," + obj[id].num + "," + obj[id].src+ "," + obj[id].color;
					}
					return cartStr;
			}
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
	    
	})
})