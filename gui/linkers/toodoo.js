function myToodoo() {
    var ps = require('python-shell');
    var path = require('path');

    var name = document.getElementById('testing').value;
    document.getElementById('testing').value = '';

    var options = {
        scriptPath: path.join(__dirname, '/../engine/'),
        args: [name]
    };

    ps.PythonShell.run('toodoo2.py', options, function (err, results) {
        if (err) throw err;
        swal(results[0]);
      });
}
