var spaStack = {}, spaCurrent;

function getSpaMode() {
    return $(window.top.document).find('.spa-home').length ? true : false;
}
function getSpaDimentions(spaObject) {
    const { options } = spaObject, m = $(window.top.document), main = m.find('#main'),
        frozenHeader = m.find('.spa-frozen-header').length ? m.find('.spa-frozen-header').outerHeight() : 0,
        footer = m.find('#t_Footer').outerHeight(),
        nav = m.find('#t_Body_nav').outerWidth(),
        header = m.find('#t_Header').outerHeight(),
        btitle = m.find('#t_Body_title').length ? m.find('#t_Body_title').outerHeight() : 0;
    if (frozenHeader > 0) options.showBreadcrumb = true;
    return {
        h: main.outerHeight() + (options.showFooter ? 0 : footer) - frozenHeader + (options.showBreadcrumb ? 0 : btitle),
        w: main.outerWidth(),
        top: header + (options.showBreadcrumb ? btitle : 0) + frozenHeader,
        left: nav
    };
}
function setDimentions(spaObject, recalc) {
    if (recalc) spaObject.dimension = getSpaDimentions(spaObject);
    let dm = spaObject.dimension,
        co = spaObject.currDialog ? spaObject.currDialog : $(spaObject.mainWindow.document).find('.spaDialog:not([data-url])');
    $(co).css('height', dm.h).css('width', dm.w).css('top', dm.top).css('left', dm.left);
}
function setSpaInitialSetting(spaObject) {
    spaObject.currDialog = $(spaObject.mainWindow.document).find('.spaDialog:not([data-url])').first();
    spaObject.currDialog.addClass('ui-resizable').addClass('ui-draggable').attr('data-url', spaObject.urlId).attr('data-title', spaObject.title);
    spaObject.currDialog.find('.ui-dialog-content iframe').focus();
}


function spaDialog(url, options, classes, trigElem) {
    //debugger;
    const ifExist = (arr, cls) => { let r = arr.find((e) => e == cls); return r ? true : false };
    let spaObject = {}, urlId = url.split('?').at(0), isOpen, openedDialog;
    //check if dialog is already open
    isOpen = $(window.top.document).find('[data-url="' + urlId + '"]').length ? true : false;
    if (isOpen) spaObject = spaStack[urlId];
    else {
        spaObject = {
            urlId: urlId,
            title: options.title,
            url: url,
            initOptions: options,
            initClasses: classes,
            initTrigElem: trigElem,
            mainWindow: window.top,
            classesArray: options.dlgCls.split(' '),
            isSpaMode: $(window.top.document).find('.spa-home').length ? true : false
        };
        spaObject.options = {
            noTitle: ifExist(spaObject.classesArray, 'spa-noTitle'),
            showBreadcrumb: ifExist(spaObject.classesArray, 'spa-showBreadcrumb'),
            showFooter: ifExist(spaObject.classesArray, 'spa-showFooter'),
            draggable: ifExist(spaObject.classesArray, 'spa-Draggable'),
            resizable: ifExist(spaObject.classesArray, 'spa-Resizable')
        };
        spaObject.dimension = getSpaDimentions(spaObject);
        if (spaObject.isSpaMode) {
            options.dlgCls += ' spaDialog';
            options.dlgCls += spaObject.options.noTitle ? ' spaDialog--no-tittle' : '';
            options.h = spaObject.dimension.h;
            options.w = spaObject.dimension.w;
            options.position = 'left' + spaObject.dimension.left + ' top' + spaObject.dimension.top;
            options.draggable = spaObject.options.draggable ? true : false;
            options.resizable = spaObject.options.resizable ? true : false;
            options.open = function () {
                if ($.ui && $.ui.dialog && !$.ui.dialog.prototype._allowInteractionRemapped && $(this).closest(".ui-dialog").length) {
                    if ($.ui.dialog.prototype._allowInteraction) {
                        $.ui.dialog.prototype._allowInteraction = function (e) {
                            return true;
                        };
                        $.ui.dialog.prototype._allowInteractionRemapped = true;
                    }
                }
            };
        }
    }
    if (spaObject.isSpaMode) {
        $(spaObject.mainWindow.document).find('.spaDialog').each((i, o) => {
            if ($(o).attr('data-url') == spaObject.urlId) {
                isOpen = true; openedDialog = $(o).find('.ui-dialog-content').first();
            }
        });
        if (isOpen) {
            if ($(openedDialog).dialog('instance')) {
                $(openedDialog).dialog("moveToTop");
            } else
                if (url.search('&success_msg') >= 0) apex.navigation.redirect(url);
                else location.reload(true);
        } else {
            apex.theme42.dialog(url, options, classes, trigElem);
        }
    } else {
        apex.theme42.dialog(url, options, classes, trigElem);
    }
    if (!isOpen) setSpaInitialSetting(spaObject);
    setDimentions(spaObject, false);
    //Save to window
    spaStack[spaObject.urlId] = (spaObject);
    spaCurrent = spaObject;
}

function spaCloseAllDialog(url) {
    url ? undefined : $(window.top.document).find(".ui-dialog-content").dialog("close");
    if (url) $($(window.top.document).find('.spaDialog').get().reverse()).each((i, e) => $(e).dialog("close"))
    else { $($('.spaDialog').get().reverse()).each((i, e) => { if ($(e).attr('data-url') == url) $(e).dialog("close") }) }
}

apex.jQuery("#t_TreeNav").on('theme42layoutchanged', function (event, obj) {
    setTimeout(() => $('.spaDialog').each((i, e) => {
        let id = $(e).data().url;
        setDimentions(spaStack[id], true);
    }), 100);
});
apex.jQuery(window).on('apexwindowresized', function () {
    setTimeout(() => $('.spaDialog').each((i, e) => {
        let id = $(e).data().url;
        setDimentions(spaStack[id], true);
    }), 100);
});
