<?php

namespace App\Packages;

class ImagePackage
{
    // Image package properties
    protected static $base_path = "";

    /**
     * Image package constructor
     */
    public function __construct()
    {
        //
    }

    /**
     * SaveImage
     */
    public static function save($image, string $folder = ""): string
    {
        if($image){

            self::createImagePath();

        // Create Image Name
        $file_name = date("Y-m-d") . time() . $image->getClientOriginalName();

        // Create Image Path
        if ($folder !== "") {
            $image_path = "/images" . "/" . $folder . "/" . $file_name;
        } else {
            $image_path = "/images" . "/" . $file_name;
        }
        // Move Image to folder
        $image->move(self::$base_path . $folder, $file_name);

        // Return Image Path for database use
        return $image_path;
    }
    }

    public static function createImagePath()
    {
        if (env("APP_ENV") == "local") {
            self::$base_path = public_path("images/");
        } else {
            // TODO Change the path to reflect the production environment if using shared hosting
            self::$base_path = base_path() . "/../public_html/images/";
        }
    }

    /**
     * Delete Image from folder
     * @param string $image_path
     * @return bool
     */
    public static function delete($file_name)
    {
        // Create the Base Path
        self::createImagePath();

        // Create Image Path
        $path = str_replace("images/", "", self::$base_path);


        // Check if file exists
        if (file_exists($path . $file_name)) {
            // Delete Image
            unlink($path . $file_name);
            return true;
        } else {
            return false;
        }
    }
}