<?php
use Phalcon\Mvc\Router;
use Phalcon\Mvc\Router\Group;
$router = new Router(false);
$router->setUriSource(Router::URI_SOURCE_SERVER_REQUEST_URI);

$router->removeExtraSlashes(true);
$router->setDefaults(array(
    'controller' => 'index',
    'action' => 'index'
));

//路由分组

$group = new Group();
// All the routes start with /api
$group->setPrefix("/api");
// Define your routes here
$group->add('/:controller/:action/:params', array(
    'controller'    => 1,
    'action'        => 2,
    'params'        => 3,
));


$group->add('/:controller', array(
    'controller'    => 1,
    'action'    => "index"
));


// /console
$group->add('[/]?', array());

// Add the group to the router
$router->mount($group);
// Not Found
$router->notFound(array(
    "controller" => "errors",
    "action"     => "show404",
    "from"       => "router.notFound",
));


$router->handle();


$di->setShared("router", $router);