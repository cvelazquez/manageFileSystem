/*
 Manage File System
 @author Christian V
 @version 1.0
 @link https://github.com/cvelazquez/manageFileSystem/new/master
*/
var mfs = (function($){
	var manageFileStorage = function(options){
		options = (options) ? options : {};

		options.typeOfStorage = ('typeOfStorage' in options && typeof options.typeOfStorage == 'number')
			? options.typeOfStorage
			: window.TEMPORARY;

		options.typeOfStorage = (options.typeOfStorage == window.TEMPORARY)
			? options.typeOfStorage
			: window.PERSISTENT;

		options._storageEngine = (options.typeOfStorage == window.PERSISTENT)
			? 'webkitPersistentStorage'
			: 'webkitTemporaryStorage';

		window.requestFileSystem = window.requestFileSystem
			|| window.webkitRequestFileSystem;

		window.resolveLocalFileSystemURL = window.resolveLocalFileSystemURL
			|| window.webkitResolveLocalFileSystemURL;

		var _mfs = {
			/**
			 *
			 **/
				_fs: null,

			/**
			 *
			 **/
				_storageEngine: 'webkitTemporaryStorage',

			/**
			 * In megabytes
			 **/
				requestedQuota: 0,

			/**
			 *
			 **/
				typeOfStorage: window.TEMPORARY,

			/**
			 * webkitPersistentStorage retorna cero grantedBytes cuando no se ha
			 * solicitado permisos al usuario
			 *
			 * webkitTemporaryStorage retorna la cantidad maxima de bytes dispo-
			 * nibles para la app
			**/
				_checkQuota: function(){
					if ( typeof navigator[_mfs._storageEngine] == 'undefined' ) {
						return;
					}

					navigator[_mfs._storageEngine].queryUsageAndQuota( 
						function(usedBytes, grantedBytes) {
							if ( grantedBytes === 0 ) {
								_mfs._requestQuota(_mfs.requestedQuota);
								return;
							}

							var usedMb = (usedBytes > 0) ? usedBytes / 1024 / 1024 : 0;
							$(_mfs).trigger('mfs.requestQuota.success', [
								grantedBytes / 1024 / 1024,
								usedMb
							]);
						}, 
						function(e) {
							$(_mfs).trigger('mfs.requestQuota.error', [e]);
						}
					);
				},

var mfs = (function($){
	var manageFileStorage = function(options){
		options = (options) ? options : {};

		options.typeOfStorage = ('typeOfStorage' in options && typeof options.typeOfStorage == 'number')
			? options.typeOfStorage
			: window.TEMPORARY;

		options.typeOfStorage = (options.typeOfStorage == window.TEMPORARY)
			? options.typeOfStorage
			: window.PERSISTENT;

		options._storageEngine = (options.typeOfStorage == window.PERSISTENT)
			? 'webkitPersistentStorage'
			: 'webkitTemporaryStorage';

		window.requestFileSystem = window.requestFileSystem
			|| window.webkitRequestFileSystem;

		window.resolveLocalFileSystemURL = window.resolveLocalFileSystemURL
			|| window.webkitResolveLocalFileSystemURL;

		var _mfs = {
			/**
			 *
			 **/
				_fs: null,

			/**
			 *
			 **/
				_storageEngine: 'webkitTemporaryStorage',

			/**
			 * In megabytes
			 **/
				requestedQuota: 0,

			/**
			 *
			 **/
				typeOfStorage: window.TEMPORARY,

			/**
			 * webkitPersistentStorage retorna cero grantedBytes cuando no se ha
			 * solicitado permisos al usuario
			 *
			 * webkitTemporaryStorage retorna la cantidad maxima de bytes dispo-
			 * nibles para la app
			**/
				_checkQuota: function(){
					if ( typeof navigator[_mfs._storageEngine] == 'undefined' ) {
						return;
					}

					navigator[_mfs._storageEngine].queryUsageAndQuota( 
						function(usedBytes, grantedBytes) {
							if ( grantedBytes === 0 ) {
								_mfs._requestQuota(_mfs.requestedQuota);
								return;
							}

							var usedMb = (usedBytes > 0) ? usedBytes / 1024 / 1024 : 0;
							$(_mfs).trigger('mfs.requestQuota.success', [
								grantedBytes / 1024 / 1024,
								usedMb
							]);
						}, 
						function(e) {
							$(_mfs).trigger('mfs.requestQuota.error', [e]);
						}
					);
				},

			/**
			 *
			 **/
				_requestQuota: function(sizeInMB){
					if ( typeof sizeInMB == 'undefined' || typeof sizeInMB != 'number' ) {
						sizeInMb = _mfs.requestedQuota;
					}

					var requestedBytes = sizeInMB * 1024 * 1024;
					navigator[_mfs._storageEngine].requestQuota(requestedBytes,
						function(grantedBytes){
							if ( grantedBytes < requestedBytes ) {
								if ( grantedBytes == 0 ) {
									$(_mfs).trigger('mfs.requestQuota.blocked', [
										"No se asigno espacio de almacenamiento"
									]);
								} else {
									var diffInMb = (requestedBytes - grantedBytes) / 1024 / 1024;
									$(_mfs).trigger('mfs.requestQuota.insufficient', [
										"El dispositivo asigno menos espacio del solicitado",
										grantedBytes / 1024 / 1024,
										diffInMb,
									]);
								}
							} else {
								var mb = grantedBytes / 1024 / 1024;
								$(_mfs).trigger('mfs.requestQuota.success', [mb, 0]);
							}
						}, function(e){
							$(_mfs).trigger('mfs.requestQuota.error', [e]);
						}
					);
				},

			/**
			 *
			 **/
				_requestFS: function(grantedMB){
					var grantedBytes = grantedMB * 1024 * 1024;
					window.requestFileSystem(_mfs.typeOfStorage, grantedBytes,
						function(fileSystemObject){
							_mfs._fs = fileSystemObject;
							$(_mfs).trigger('mfs.requestFS.success', [fileSystemObject, grantedBytes / 1024 / 1024]);
						}, function(fileErrorObject){
							var msg = '';
							switch (e.code) {
								case FileError.QUOTA_EXCEEDED_ERR:
									msg = 'QUOTA_EXCEEDED_ERR';
									break;
								case FileError.NOT_FOUND_ERR:
									msg = 'NOT_FOUND_ERR';
									break;
								case FileError.SECURITY_ERR:
									msg = 'SECURITY_ERR';
									break;
								case FileError.INVALID_MODIFICATION_ERR:
									msg = 'INVALID_MODIFICATION_ERR';
									break;
								case FileError.INVALID_STATE_ERR:
									msg = 'INVALID_STATE_ERR';
									break;
								default:
									msg = 'Unknown Error';
									break;
							};

							$(_mfs).trigger('mfs.requestFS.error', [msg]);
						}
					);
				},

			readFile: function(filename, readType){
				if ( !_mfs._fs ) {
					throw new Error("File System Object has not been initiated");
				}

				var deferred = new $.Deferred();

				_mfs._fs.root.getFile(filename, {}, function(f){
					f.file(function(fileContent){
						var reader = new FileReader();
						reader.onloadend = function(e){
							deferred.resolve(filename, this.result);
							$(_mfs).trigger('mfs.readFile.success', [filename, this.result]);
						}

						switch(readType){
							case 'arrayBuffer':
								reader.readAsArrayBuffer(fileContent);
								break;
							case 'b64':
								reader.readAsDataURL(fileContent);
								break;
							case 'text':
								reader.readAsText(fileContent);
								break;
							case 'binary':
								reader.readAsBinaryString(fileContent);
								break;
							default:
								$(_mfs).trigger('mfs.readFile.success', [filename, fileContent]);
								deferred.resolve(filename, fileContent);
								break;
						}

					}, function(e){
						$(_mfs).trigger('mfs.readFile.error', [filename, e]);
						deferred.reject(filename, e);
					});
				}, function(e){
					$(_mfs).trigger('mfs.readFile.error', [filename, e]);
					deferred.reject(filename, e);
				});

				return deferred.promise();
			},

			deleteFile: function(filename){
				if ( !_mfs._fs ) {
					throw new Error("File System Object has not been initiated");
				}

				var deferred = new $.Deferred();

				_mfs._fs.root.getFile(filename, {}, function(f){
					f.remove(function(){
						deferred.resolve(filename);
						$(_mfs).trigger('mfs.deleteFile.success', [filename]);
					}, function(e){
						deferred.reject(e);
						$(_mfs).trigger('mfs.deleteFile.error', [filename, e]);
					});
				}, function(e){
					deferred.reject(e)
					$(_mfs).trigger('mfs.deleteFile.error', [filename, e]);
				});

				return deferred.promise();
			},

			_saveFile: function(filename, fileContent, fileType){
				var _deferred = new $.Deferred();
				_mfs._fs.root.getFile(filename, {create: true}, function(f){
					// f.isFile, f.name, f.fullPath, f.toURL()
					f.createWriter(function(writer){
						writer.onwriteend = function(e){
							$(_mfs).trigger('mfs.saveFile.success', [filename, f]);
							_deferred.resolve(filename, f);
						}

						writer.onerror = function(e){
							$(_mfs).trigger('mfs.saveFile.error', [filename, e.toString()]);
							_deferred.reject(filename, e.toString());
						}

						if ( fileType ) {
							var blob = new Blob([fileContent], {type: fileType});
							writer.write(blob);
						} else {
							writer.write(fileContent);
						}
					}, function(e){
						$(_mfs).trigger('mfs.saveFile.error', [filename, e]);
						_deferred.reject(filename, e.toString());
					});
				}, function(e){
					$(_mfs).trigger('mfs.saveFile.error', [filename, e]);
					_deferred.reject(filename, e.toString());
				});

				return _deferred.promise();
			},

			saveFile: function(filename, fileContent, fileType){
				if ( !_mfs._fs ) {
					throw new Error("File System Object has not been initiated");
				}

				if ( filename.search('/') == -1 ) {
					return _mfs._saveFile.apply(_mfs, arguments);
				}

				var saveArguments = arguments;
				var path = filename.split('/');
				path.pop();// file
				var deferred = new $.Deferred();

				_mfs.mkdir(path.join('/')).done(function(path){
					_mfs._saveFile.apply(_mfs, saveArguments).done(function(fname, f){
						deferred.resolve(filename, f);
					}).fail(function(){
						deferred.reject(e);
						$(_mfs).trigger('mfs.saveFile.error', [filename, e]);
					});
				}).fail(function(e){
					deferred.reject(e);
					$(_mfs).trigger('mfs.saveFile.error', [filename, e]);
				});

				return deferred.promise();
			},

			//TODO: Trigger events
			getDir: function(path){
				var deferred = new $.Deferred();
				_mfs._fs.root.getDir(path).done(function(dirEntry){
					deferred.resolve(dirEntry);
				}, function(e){
					deferred.reject(path, e);
				});
				return deferred.promise();
			},
			_scandir: function(dir, deferred, files){
				dir.readEntries(function(results){
					if ( !results.length ) {
						deferred.resolve(files);
						$(_mfs).trigger('mfs.scandir.success', [files]);
					} else {
						var r = results || [];
						files = files.concat(r.slice(0));
						_mfs._scandir(dir, deferred, files);
					}
				}, function(e){
					deferred.reject(path, e);
					$(_mfs).trigger('mfs.scandir.error', [path, e]);
				});
			},
			scandir: function(path){
				var deferred = new $.Deferred();
				if ( !path || path == "/" ) {
					var dir = _mfs._fs.root.createReader();
					_mfs._scandir(dir, deferred, []);
				} else {
					_mfs._fs.root.getDirectory(path, {}, function(dirEntry){
						var dir = dirEntry.createReader();
						_mfs._scandir(dir, deferred, []);
					}, function(e){
						$(_mfs).trigger('mfs.scandir.error', [path, e]);
						deferred.reject(path, e);
					});
				}
				return deferred.promise();
			},

			resolveURL: function(url){
				var deferred = new $.Deferred();
				window.resolveLocalFileSystemURL(url, function(f){
					$(_mfs).trigger('mfs.resolveURL.success', [f]);
					deferred.resolve(f);
				});
				return deferred.promise();
			},

			_mkdir: function(rootDirEntry, folders, fullPath){
				if ( !_mfs._fs ) {
					throw new Error("File System Object has not been initiated");
				}

				if ( fullPath == folders.join('/') ) {
					var deferred = new $.Deferred();
				}

				if (folders[0] == '.' || folders[0] == '') {
					folders = folders.slice(1);
				}

				rootDirEntry.getDirectory(folders[0], {create: true}, function(dirEntry) {
					folders = folders.slice(1);
					if (folders.length) {
						_mfs._mkdir(dirEntry, folders, fullPath);
					} else {
						$(_mfs).trigger('mfs.mkdir.success', [fullPath]);
						deferred.resolve(fullPath);
					}
				}, function(e){
					$(_mfs).trigger('mfs.mkdir.error', [e]);
					deferred.reject(e);
				});
				return deferred.promise();
			},

			mkdir: function(dirname){
				if ( !_mfs._fs ) {
					throw new Error("File System Object has not been initiated");
				}

				var folders = dirname.split('/');
				return _mfs._mkdir(_mfs._fs.root, folders, dirname);
			}
		};

		$.extend(_mfs, options);

		$(_mfs).on('mfs.requestQuota.success', function(e, grantedMB, usedMb){
			_mfs._requestFS(grantedMB);
		});

		$(_mfs).on('mfs.requestQuota.insufficient', function(e, grantedMB){
			_mfs._requestFS(grantedMB);
		});

		if ( _mfs.requestedQuota > 0 ) {
			_mfs._checkQuota();
		}

		return _mfs;
	}
	return manageFileStorage;
})(jQuery);
