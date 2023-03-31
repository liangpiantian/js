	/**
	*此JS主要用于td的合并
	*给出要合并的列的ClassName，即可自动合并
	**/
function groupTdByClass(classname,type='')
{
	if(type==''||type=='rowspan'){
		type="rowspan";
	}else{
		type="colspan";
	}
	var tds=$("."+classname);
	var currenttd=tds[0];//初始化第一个
	
	var rowspan=1;//最初需要合并数量为0；
	for(var i=1;i<tds.length;i++){
		if($(tds[i]).html()==$(currenttd).html()){
			$(tds[i]).remove();
			rowspan++;
		}else{
			if(rowspan>1){
				$(currenttd).attr(type,rowspan);
				$(currenttd).css({'vertical-align':"middle",'text-align':'center','font-weight':"bold"});
			}
			rowspan=1;
			currenttd=tds[i];
		}
	}
	$(currenttd).attr(type,rowspan);
	$(currenttd).css({'vertical-align':"middle",'text-align':'center','font-weight':"bold"});
}

	/**
	 *
	 * @param classname1 主类名
	 * @param type ''=>rowspan,'colspan'=>'colspan'
	 * @param classnamearray =>跟随主类合并而合并的类 (是个数组)
	 * @param ord =>first/last,classname2对应的格子合并后填充的值放第一个还是最后一个
	 */
function groupTdByClassFollows(classname1,type,classnamearray,ord)
{
	if(type==''||type=='rowspan'){
		type="rowspan";
	}else{
		type="colspan";
	}
	let tds=$("."+classname1);
	let tdsarray=[];
	for(let i=0;i<classnamearray.length;i++){
		tdsarray[i]=$("."+classnamearray[i]);
	}
	let currenttd=tds[0];//初始化第一个
	let currenttds=[];
	let currenttdshtml=[];
	for(let i=0;i<classnamearray.length;i++){
		currenttds[i]=tdsarray[i][0];
		currenttdshtml[i]=$(tdsarray[i][0]).html();
	}


	var rowspan=1;//最初需要合并数量为0；
	for(var i=1;i<tds.length;i++){
		if($(tds[i]).html()==$(currenttd).html()){
			$(tds[i]).remove();
			if(ord=='last'){//如果是last,那么记录最新的值
				for(let j=0;j<classnamearray.length;j++){
					currenttdshtml[j]=$(tdsarray[j][i]).html();
				}
			}
			for(let j=0;j<classnamearray.length;j++){
				$(tdsarray[j][i]).remove();
			}
			rowspan++;
		}else{
			if(rowspan>1){
				$(currenttd).attr(type,rowspan);
				$(currenttd).css({'vertical-align':"middle",'text-align':'center','font-weight':"bold"});
				for(let j=0;j<classnamearray.length;j++){
					$(currenttds[j]).attr(type,rowspan);
					$(currenttds[j]).html(currenttdshtml[j]);
					$(currenttds[j]).css({'vertical-align':"middle",'text-align':'center'});
				}
			}
			rowspan=1;
			currenttd=tds[i];
			for(let j=0;j<classnamearray.length;j++){
				currenttds[j]=tdsarray[j][i];
				currenttdshtml[j]=$(tdsarray[j][i]).html();
			}
		}
	}
	$(currenttd).attr(type,rowspan);
	$(currenttd).css({'vertical-align':"middle",'text-align':'center','font-weight':"bold"});
	for(let j=0;j<classnamearray.length;j++){
		$(currenttds[j]).attr(type,rowspan);
		$(currenttds[j]).html(currenttdshtml[j]);
		$(currenttds[j]).css({'vertical-align':"middle",'text-align':'center'});
	}
}
