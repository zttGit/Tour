<table class="table tree-grid table-striped table-bordered table-condensed table-hover" id="test-table">
    <thead>
    <tr>
        <th>编号</th>
        <th>名字</th>
    </tr>
    </thead>
    <tbody>
    <?php foreach ($heroes as $hero) { ?>
    <tr>
        <td><?= $hero->id ?></td>
        <td><?= $hero->name ?></td>
    </tr>
    <?php } ?>
    <tr></tr>
    </tbody>
</table>