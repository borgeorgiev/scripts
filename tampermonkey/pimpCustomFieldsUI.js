// ==UserScript==
// @name         JIRA Custom fields
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http://*/secure/admin/ViewCustomFields.jspa*
// @match        https://*/secure/admin/ViewCustomFields.jspa*
// @grant        none
// ==/UserScript==
/* jshint -W097 */
'use strict';

AJS.$(function() {
    $ = AJS.$
    var loadCSS = function(href) {
        var cssLink = $("<link rel='stylesheet' type='text/css' href='"+href+"'>");
        $("head").append(cssLink); 
    };

    function loadScript(url, callback) {
        var script = document.createElement("script");
        script.type = "text/javascript";
        console.log(url);
        if (script.readyState) {// IE
            script.onreadystatechange = function() {
                if (script.readyState == "loaded" || script.readyState == "complete") {
                    script.onreadystatechange = null;
                    callback();
                }
            };
        } else {// Others
            script.onload = function() {
                callback();
            };
            script.onerror = function() {
                callback();
            };
        }

        script.src = url;
        document.getElementsByTagName("head")[0].appendChild(script);
    }


    function requireScripts(callback) {
        var scripts = new Array (
            'https://code.jquery.com/jquery-1.12.0.min.js',
            'https://cdn.datatables.net/1.10.11/js/jquery.dataTables.js'
        );    

        /**
	 * Recursively loads all scripts in the given array. Loading is executed in the order of the array elements.
	 * After all scripts are loaded the callback is invoked.
	 * 
	 * @param scripts Array of script URLs
	 * @param callback function to be called once all scripts are loaded.
	 */
        var loadScripts = function(scripts, callback) {
            if(scripts.length == 0) {			
                callback();
                return;
            }

            var script = scripts.shift();
            loadScript(script, function(){loadScripts(scripts, callback)})
        }
        loadScripts(scripts, callback);
    }

    loadCSS('https://cdn.datatables.net/1.10.11/css/jquery.dataTables.min.css');
    requireScripts(function() {
        console.log('Scripts loaded');
        // Clean up script tags in description
        $('.secondary-text.description>script').remove()
        // Data table bind
        $('#custom-fields').dataTable( {
            "bPaginate": false,
            columnDefs: [
                { targets: [2,3,4], orderable: false },
                { targets: [0,1], orderable: true },
                { targets: '_all', type: 'html' },
                { targets: 0, type: 'html',
                 render: function ( data, type, full, meta ) {
                     var id = $($(full[4])[0]).attr('aria-owns').replace('field-actions-customfield_','');
                     return '<span class="aui-lozenge aui-lozenge-subtle aui-lozenge-success">'+id+'</span> '+data;
                 }
                }
            ],
            initComplete: function () {
                this.api().columns().every( function () {
                    var column = this;
                    if(column.index() !=1) {
                      return true;
                    }
                    var select = $('<select><option value=""></option></select>')
                    .appendTo( $(column.header()))
                    .on( 'change', function () {
                        var val = $.fn.dataTable.util.escapeRegex(
                            $(this).val()
                        );

                        column
                            .search( val ? '^'+val+'$' : '', true, false )
                            .draw();
                    } );

                    column.data().unique().sort().each( function ( d, j ) {
                        select.append( '<option value="'+d+'">'+d+'</option>' )
                    } );
                } );
            }
        });  
    });


});
