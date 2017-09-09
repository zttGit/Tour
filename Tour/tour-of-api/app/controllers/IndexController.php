<?php

class IndexController extends ControllerBase
{
    public function indexAction()
    {
        $heroes = Hero::find();
        $this->view->setVar("heroes",$heroes);
//        var_dump(json_encode($heroes->toArray()));
//        exit;
    }
//    public function queryAction(){
//        $this->view->disable();
//        $this->response->setContentType("application/json","UTF-8");
//        $this->response->setStatusCode(200);
//        $heroes = Hero::find();
//        return $this->response->setJsonContent($heroes,JSON_UNESCAPED_UNICODE|JSON_NUMERIC_CHECK);
//    }

    public function queryAction(){
        $heroes = Hero::find();
        return json_encode($heroes->toArray());
    }

    public function queryByIdAction($id){
//        var_dump($id);
        $hero = Hero::findFirst($id);
        return json_encode($hero->toArray()) ;
    }

    public function updateAction($id){

        $hero = Hero::findFirst($id);
        $result = $hero->save();
    }

    function router404Action(){
        $this->view->disable();
        echo "404";
    }

}

