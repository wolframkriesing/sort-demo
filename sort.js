var listNode = document.getElementById("objectList");
var searchNode = document.getElementById("search");
searchNode.onkeyup = function(){ filterList(searchNode.value); };
document.getElementById("clearSearchButton").onclick = function(e){ searchNode.value = ""; searchNode.onkeyup() };

render(getMembers(window));

function getMembers(object){
	var objects = [];
	for (var key in object){
		objects.push(""+key);
	}
	objects.sort(function(a,b){ return a.toLowerCase() < b.toLowerCase() ? -1 : 1 });
	return objects;
}

function render(objects){
	var letters = {};
	var shortcutsNode = document.getElementById("shortcuts");
	for (var i=0, l=objects.length, o; i<l; i++){
		o = objects[i];
		var li = document.createElement("li");
		li.innerHTML = o;
		li._value = o;
		//li.onclick = (function(o){
		//	return function(){alert(window[o])}
		//})(o);
		listNode.appendChild(li);
		letters[o.substr(0,1).toUpperCase()] = true;
	}
	for (var letter in letters){
		shortcutsNode.appendChild(document.createElement("li")).innerHTML = letter;
	}
	shortcutsNode.onclick = function(e){ searchNode.value = "^" + e.target.innerHTML.replace(/[^A-Z]/, ""); searchNode.onkeyup(); }
}

function filterList(s){
	var nodes = listNode.childNodes;
	var searchAtStart = s.substr(0,1) == "^";
	var s1 = s.toLowerCase().replace(/^\^/, "");
	for (var i=0, l=nodes.length, n; i<l; i++){
		n = nodes[i];
		if (searchAtStart){
			var foundAt = n._value.toLowerCase().substr(0, s1.length)==s1 ? 0 : -1;
		} else {
			var foundAt = n._value.toLowerCase().indexOf(s1);
		}
		n.style.display = foundAt!=-1 ? "" : "none";
		var v = n._value;
		if (foundAt != -1){
			n.innerHTML = v.substr(0, foundAt) + '<mark>' +
				v.substr(foundAt, s1.length) + '</mark>' + v.substr(foundAt+s1.length);
		} else {
			n.innerHTML = v;
		}
	}
}

