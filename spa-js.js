function getSpaMode() {
    return $(window.top.document).find('.spa-home').length ? true : false;
}
function getSpaDimentions(showBreadcrumb, showFooter) {
    const m = $(window.top.document), main = m.find('#main'),
        frozenHeader = m.find('.spa-frozen-header').length ? m.find('.spa-frozen-header').outerHeight() : 0,
        footer = m.find('#t_Footer').outerHeight(),
        nav = m.find('#t_Body_nav').outerWidth(),
        header = m.find('#t_Header').outerHeight(),
        btitle = m.find('#t_Body_title').length ? m.find('#t_Body_title').outerHeight() : 0;
    if (frozenHeader > 0) showBreadcrumb = true;
    return {
        h: main.outerHeight() + (showFooter ? 0 : footer) - frozenHeader + (showBreadcrumb ? 0 : btitle),
        w: main.outerWidth(),
        top: header + (showBreadcrumb ? btitle : 0) + frozenHeader,
        left: nav
    };
}
function setDimentions(showBreadcrumb, showFooter) {
    let dm = getSpaDimentions(showBreadcrumb, showFooter);
    $(window.top.document).find('.spaDialog').css('height', dm.h).css('width', dm.w).css('top', dm.top).css('left', dm.left);
}
function setSpaInitialSetting(url, layout, title) {
    setDimentions(layout.showBreadcrumb, layout.showFooter);
    let currDialog = $(window.top.document).find('.spaDialog:not([data-url])');
    currDialog.addClass('ui-resizable').addClass('ui-draggable').attr('data-url', url).attr('data-title',title);
    currDialog.find('.ui-dialog-content iframe').focus();
}


function spaDialog(url, options, classes, trigElem) {
    const classesArray = options.dlgCls.split(' ');
    const ifExist = (cls) => { return classesArray.find((a) => a == cls) ? true : false };
    let isOpen = false, openedDialog, urlId = url.split('?').at(0), isSpaMode = getSpaMode();
    let mainWindow = window.top, dm = getSpaDimentions(ifExist('spa-showBreadcrumb'), ifExist('spa-showFooter'));
    if (isSpaMode) {
        options.dlgCls += ' spaDialog';
        options.dlgCls += ifExist('spa-noTitle') ? ' spaDialog--no-tittle' : '';
        options.h = dm.h;
        options.w = dm.w;
        options.position = 'left' + Math.round(dm.left) + ' top' + Math.round(dm.top);
        options.draggable = ifExist('spa-Draggable') ? true : false;
        options.resizable = ifExist('spa-Resizable') ? true : false;
    }
    if (isSpaMode) {
        $(mainWindow.document).find('.spaDialog').each((i, o) => { if ($(o).attr('data-url') == urlId) { isOpen = true; openedDialog = $(o).find('.ui-dialog-content').first(); } });
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
    setSpaInitialSetting(urlId,
        { showBreadcrumb: ifExist('spa-showBreadcrumb'), showFooter: ifExist('spa-showFooter') }
        , options.title);
}

function spaCloseAllDialog(url) {
    url ? undefined : $(window.top.document).find(".ui-dialog-content").dialog("close");
    if (url) $($(window.top.document).find('.spaDialog').get().reverse()).each((i, e) => $(e).dialog("close"))
    else { $($('.spaDialog').get().reverse()).each((i, e) => { if ($(e).attr('data-url') == url) $(e).dialog("close") }) }
}

apex.jQuery("#t_TreeNav").on('theme42layoutchanged', function (event, obj) {
    setTimeout(() => $('.spaDialog').each((i, e) => setDimentions()), 100);
});
apex.jQuery(window).on('apexwindowresized', function () {
    setTimeout(() => $('.spaDialog').each((i, e) => setDimentions()), 100);
});