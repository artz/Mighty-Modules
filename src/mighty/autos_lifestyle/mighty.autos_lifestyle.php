<?php

$Mighty = new Mighty();
$json = $Mighty->getJSON('http://autos.aol.com/cars-js/global/get_new_data.jsp');

?>
<div class="mighty-autos mighty-autos_lifestyle mighty-reset">
	<h2 class="header">Find the <em>Right Car</em></h2>
	<form action="http://autos.aol.com/choosecontrol-listings/" enctype="application/x-www-form-urlencoded" method="get">
		<select name="life">
			<option>Choose Your Lifestyle</option>
			<option value="single male">Single Male</option>
			<option value="single female" >Single Female</option>
			<option value="small family">Small Family</option>
			<option value="large family">Large Family</option>
		</select>
		<input type="submit" value="GO">
	</form>
</div>