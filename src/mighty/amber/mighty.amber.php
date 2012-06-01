<?php

$Mighty = new Mighty();
$json = $Mighty->getJSON('http://api.socialalerts.aol.com/api/amber');
// $json = $Mighty->getJSON('http://socialalerts.aol.com/test/api/amber');
// $json = $Mighty->getJSON('amber.json');

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
    foreach( $json as $item ):
        $alert = $item->Alert;
        if ( $alert->Status == 'Active' ):
            $victims = $alert->Victims;
            foreach( $victims as $victim ):

                echo '<li>';
                if ( isset( $victim->PhysicalDescription->Picture->ExternalPicture->HostedImageUrl ) ):
                    $img_src = $victim->PhysicalDescription->Picture->ExternalPicture->HostedImageUrl;
                    echo '<a target="_blank" href="http://socialalerts.aol.com/amber/alert/' .
                        $alert->AlertId . '"><img height="100" src="' . $img_src . '" alt="Picture of '.
                        $victim->PersonGivenName . ' ' . $victim->PersonSurName . '"></a>';
                endif;

                echo '<h3><a target="_blank" href="http://socialalerts.aol.com/amber/alert/' .
                    $alert->AlertId . '">' . $victim->PersonGivenName . ' ' .
                    $victim->PersonSurName . '</a></h3>';

                $incident = $alert->IncidentInformation;
                $address = $incident->LastSeenAddress;
                echo '<p>' . $victim->Age . ' ' . $victim->Gender . ' in <nobr>' .
                    $address->AddressCityName . ', ' . $address->AddressStateName . '</nobr></p>';

                echo '<p>Last seen ' . ago( strtotime( $incident->MissingPersonLastSeenDate ) ) . '</p>';
            echo "</li>\n";
            endforeach;
        endif;
    endforeach;
?>
</ul>
</div>
<?php
endif;
?>
