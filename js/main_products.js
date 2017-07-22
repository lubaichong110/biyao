require.config({//配置main_index.js所依赖的模块
	paths:{
		"jquery":"jquery-1.11.3",
		"fnMoudle":"fnMoudle"
	}
})
require(["jquery","fnMoudle"],function($,fnMoudle){
	$(".code").load("../data/data.html .sharCode",function(){
			fnMoudle.code();
		});
	    $(".top").load("../data/data.html header");
		$(".nav_fixed").load("../data/data.html .nav");
        $(".bottom").load("../data/data.html footer");
        
        
})