<?php

class ErrorsController extends ControllerBase
{
    public function show404Action()
    {
        $this->view->disable();
        echo "404";
    }


}

