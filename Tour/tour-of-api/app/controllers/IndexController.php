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
        $hero = Hero::findFirst($id);
        return json_encode($hero->toArray()) ;
    }

    /**
     * 修改英雄名称
     * @param $id
     */
    public function updateAction($id){
        $getHero = $this->request->getJsonRawBody();  // 前台获取的json数据转成对象
        var_dump($getHero);
        $hero = Hero::findFirst($id);
        $hero->name = $getHero->name;
        $result = $hero->save();
        if($result){
            echo "数据更新失败";
        }
    }

    /**
     * 新增英雄
     */
    public function addAction(){
        $newHero = $this->request->getJsonRawBody();
        $this->response->setContentType('application/json', 'UTF-8');
        var_dump($newHero);
        $hero = new Hero();
        $hero->save(array(
            'name' => $newHero->name,
        ));
        return $this->response->setJsonContent($hero,JSON_UNESCAPED_UNICODE|JSON_NUMERIC_CHECK);
    }

    /**
     * 删除英雄
     */
    public function deleteAction($id){
        $hero = Hero::findFirst($id);
        $hero->delete();
        return $this->response->setJsonContent($hero,JSON_UNESCAPED_UNICODE|JSON_NUMERIC_CHECK);
    }

    /**
     * 搜素英雄
     */
    public function searchAction(){
        $search = $this->request->getQuery("name");
        $builder = $this->modelsManager->createBuilder()
            ->columns("h.id,h.name")
            ->addFrom("Hero","h")
            ->orderBy("h.id");
        //搜索功能
        if (!empty($search)) {
            $builder->andWhere("(b.name like :search:)", array( 'search' => '%'.$search.'%'));
        }
        return $this->response->setJsonContent($builder,JSON_UNESCAPED_UNICODE|JSON_NUMERIC_CHECK);
    }

    function router404Action(){
        $this->view->disable();
        echo "404";
    }

}

