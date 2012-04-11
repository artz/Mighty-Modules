<?php

$amber_response = file_get_contents($_SERVER["DOCUMENT_ROOT"].'/Mighty-Modules/src/mighty/amber.json');
// $amber_response = file_get_contents('http://api.socialalerts.aol.com/api/amber');

$json = json_decode($amber_response);

function ago($i){
    $m = time()-$i; $o='just now';
    $t = array('year'=>31556926,'month'=>2629744,'week'=>604800,
'day'=>86400,'hour'=>3600,'minute'=>60,'second'=>1);
    foreach($t as $u=>$s){
        if($s<=$m){$v=floor($m/$s); $o="$v $u".($v==1?'':'s').' ago'; break;}
    }
    return $o;
}

if ( count( $json ) > 0 ):
?>
<div class="mighty-amber mighty-reset">
<h2>Amber Alerts</h2>
<ul class="alerts">
<?php
    foreach( $json[0] as $alert ):
        if ( $alert->Status == 'Active' ):
            echo '<li>';
            $victims = $alert->Victims;
            foreach( $victims as $victim ):
                echo '<h3><a target="_blank" href="http://socialalerts.aol.com/amber/alert/' .
                    $alert->AlertId . '">' . $victim->PersonGivenName . ' ' .
                    $victim->PersonSurName . '</a></h3>';
                $incident = $alert->IncidentInformation;
                $address = $incident->LastSeenAddress;
                echo '<p>' . $victim->Age . ' ' . $victim->Gender . ' in ' .
                    $address->AddressCityName . ', ' . $address->AddressStateName . '</p>';

                echo '<p>Last seen ' . ago( strtotime( $incident->MissingPersonLastSeenDate ) ) . '</p>';
            endforeach;
            echo "</li>\n";
        endif;
    endforeach;
?>
</ul>
<a name="mighty" class="mighty-amber"<?=$dataOptions?> href="http://www.mightymodules.com/source/">Get the <b>Amber Alerts Module</b></a>
</div>
<?php
endif;
?>
