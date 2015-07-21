<?php
class StaticResources {

    private $dataErrorIndexes = array();
    private $images = array(
        'champion' => array(),
        'item'     => array(),
        'mastery' => array(),
        'rune'     => array(),
        'spell'    => array()
    );
    
    /**
        * @desc sets environment variables
        * @params $riotInstance - an instance of the RiotApi class
        * @returns void
    */
    function __construct( $riotInstance ) {
        
        $this->riotInstance = $riotInstance;
        $this->riotData = $riotInstance->getStaticApiData();
        
    }
    
    /**
        * @desc gets any errors from the riot api transactions
        * @params none
        * @return boolean - true if there are errors false if not
    */
    public function getDataErrors() {
        
        if ( count( $this->riotInstance->errors ) > 0 ) {
            $this->dataHasErrors = true;
            $this->dataErrorIndexes = $this->riotInstance->errors;
        } else {
            $this->dataHasErrors = false;
        }
        
    }
    
    /**
        * @desc saves static json data and images to their respective folders
        * @params none
        * @return void
    */
    public function saveStaticResources() {
        
        $this->getDataErrors();
        $this->getStaticImagesArray();
        
        foreach ( $this->riotData as $key => $data ) {
            
            if ( !in_array( $key, $this->dataErrorIndexes ) ) {
                file_put_contents( "json_archive/$key.json", json_encode( $data ) );
                $this->saveStaticImages( $data );
            }
            
        }
        
    }
    
    /**
        * @desc saves all of the images we don't have locally from the lol cdn
        * @params $data - the data from the current iteration api call type
        * @return void
    */
    private function saveStaticImages( $data ) {
        
        $tmpFile;
        
        foreach ( $data['data'] as $key => $val ) {
            $type = $data['type'] == 'summoner' ? 'spell' : $data['type']; // spell is indexed as summoner
            if ( !in_array( "$key.png", $this->images[ $type ] ) ) {
                $ch = curl_init("http://ddragon.leagueoflegends.com/cdn/5.2.1/img/$type/$key.png");
                $fp = fopen("../images/$type/$key.png", 'wb');
                curl_setopt($ch, CURLOPT_FILE, $fp);
                curl_setopt($ch, CURLOPT_HEADER, 0);
                curl_exec($ch);
                curl_close($ch);
                fclose($fp);
                $this->removeEmptyImage( "../images/$type/$key.png" );
            }
        }
        
    }
    
    private function removeEmptyImage( $filename ) {
        
        $filesize = filesize( $filename );
        
        if ( $filesize < 1000 ) {
            unlink( $filename );
        }
        
    }
    
    /**
        * @desc gets an array of all of the current images in our images folders
        * @params none
        * @return void
    */
    
    private function getStaticImagesArray() {
        
        foreach ( $this->images as $dir => $img ) {
            $this->images[ $dir ] = scandir( "../images/$dir" );
        }
        
    }

}
?>