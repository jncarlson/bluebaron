<?php
// To access this go to {app url}/api/version-data.php?secretParam=9406
if ( !isset( $_GET['secretParam'] ) ) {
	exit('Sorry nothing here.');
} elseif ( $_GET['secretParam'] !== '9406' ) {
	exit('Nothing to see here.');
}

?>
<!DOCTYPE html>
<html>
<head>
	<title>Version Stuff</title>
	<script type="text/javascript">
		
		var additions = {
			getHTML: function ( id ) {
				var html =  '<button class="add">+</button>'
				+ '<button class="delete" for="' + id + '">-</button>'
				+ '<select name="tag[]">'
				+ '<option>New</option>'
				+ '<option>Improved</option>'
				+ '<option>Fixed</option>'
				+ '<option>Important</option>'
				+ '<option>Note</option>'
				+ '</select>'
				+ '<br />'
				+ '<textarea type="text" name="item[]" rows="10" cols="50"></textarea>';
			return html;
			},
			appendAddition: function() {
				var id = 'item' + count;
				var addition = this.getHTML( id );
				var newId = document.getElementById( 'additions' );
				var elem = document.createElement('div');
				elem.innerHTML = addition;
				newId.appendChild( elem );
				elem.setAttribute( 'id', id );
				this.addListeners( id );
				count++;
			},
			addListeners: function( id ) {
				var self = this;
				var addElems = document.getElementsByClassName( 'add' );
				var delElems = document.getElementsByClassName( 'delete' );
				for ( var i = 0; i < addElems.length; i++ ) {
					addElems[i].addEventListener( 'click', function(e) {
						e.preventDefault();
						self.appendAddition();
						return false;
					});
					delElems[i].addEventListener( 'click', function(e) {
						e.preventDefault();
						var elem = document.getElementById( id );
						elem.parentNode.removeChild(elem);
						count--;
						return false;
					});
				}
			}

		};
		count = 1;
		window.onload = function() {
			additions.appendAddition();
		};
	</script>
</head>
<body>
	<form method="post" action="version-handler.php">
		<input type="submit" name="submit">
		<div>
			<h3>Release Title</h3>
			<input type="text" name="title" />
		</div>
		<div>
			<h3>Date</h3>
			<input type="date" name="date" />
		</div>
		<div>
			<h3>Announcement</h3>
			<input type="text" name="announcement" />
		</div>
		<h3>Additions</h3>
		<div id="additions"></div>
		<input type="submit" name="submit">
	</form>
</body>
</html>