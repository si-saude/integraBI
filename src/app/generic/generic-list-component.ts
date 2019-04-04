import { Router } from '@angular/router';

import { GenericFilter } from './generic-filter';
import { GenericService } from './generic-service';
import { Helper } from './helper';
import { IModal } from './imodal';

export abstract class GenericListComponent<T, F extends GenericFilter> implements IModal {

    protected filter: F;
    protected array: Array<T>;
    protected total: 0;
    protected _showFilterModal = false;
    protected helper: Helper;

    constructor(protected service: GenericService<T, F>, protected r: Router, protected title: string,
        protected tableDef: Array<Array<string>>) {
        this.filter = service.initializeFilter();
        this.array = new Array<T>();
        this.helper = new Helper();
        this.r.routerState.snapshot.url = title;
    }

    getFilter(pageNumber) {
      this.filter.$pageNumber = pageNumber;
      this.filter = this.service.transformFilter(this.filter);
      return this.filter;
    }

    protected getList(filter) {
        const component = this;
        this.service.list(filter, function(res){
            const ret = res.json();
            component.total = ret.total;
            component.array = component.service.toList(ret.list);
            let pages = parseInt((component.total / filter.pageSize).toString());
            if (component.total % filter.pageSize > 0) {
                pages++;
            }
            document.getElementById('pagination').innerHTML = createPagination(pages, parseInt(filter.pageNumber));
        }, null);
    }

    protected page(pageNumber) {
        this.getList(this.getFilter(pageNumber));
        (<any>document.getElementById('pageNumber')).value = pageNumber;
    }

    public callPage() {
        const pageNumber = <any>document.getElementById('pageNumber');
        this.page(pageNumber.value);
    }

    openFilterModal() {
      this._showFilterModal = true;
    }

    closeModal() {
      this._showFilterModal = false;
    }

    modalIsShowed(): boolean {
      return this._showFilterModal;
    }

    confirmModal() {
      this.page(1);
      this.closeModal();
    }

    public getService(): GenericService<T, F> {
      return this.service;
    }
}

function createPagination(pages, page) {
    let str = '<ul>';
    let active;
    let pageCutLow = page - 1;
    let pageCutHigh = page + 1;
    // Show the Previous button only if you are on a page other than the first
    if (page > 1) {
      str += '<li class="page-item previous no"><a onclick="callPage(' + (page - 1) + ')"><</a></li>';
    }
    // Show all the pagination elements if there are less than 6 pages total
    if (pages < 6) {
      for (let p = 1; p <= pages; p++) {
        active = page === p ? 'active' : 'no';
        str += '<li class="' + active + '"><a onclick="callPage(' + p + ')">' + p + '</a></li>';
      }
    }
    // Use "..." to collapse pages outside of a certain range
    else {
      // Show the very first page followed by a "..." at the beginning of the
      // pagination section (after the Previous button)
      if (page > 2) {
        str += '<li class="no page-item"><a onclick="callPage(1)">1</a></li>';
        if (page > 3) {
            str += '<li class="out-of-range"><a onclick="callPage('+(page-2)+')">...</a></li>';
        }
      }
      // Determine how many pages to show after the current page index
      if (page === 1) {
        pageCutHigh += 2;
      } else if (page === 2) {
        pageCutHigh += 1;
      }
      // Determine how many pages to show before the current page index
      if (page === pages) {
        pageCutLow -= 2;
      } else if (page === pages-1) {
        pageCutLow -= 1;
      }
      // Output the indexes for pages that fall inside the range of pageCutLow
      // and pageCutHigh
      for (let p = pageCutLow; p <= pageCutHigh; p++) {
        if (p === 0) {
          p += 1;
        }
        if (p > pages) {
          continue;
        }
        active = page == p ? "active" : "no";
        str += '<li class="page-item '+active+'"><a onclick="callPage('+p+')">'+ p +'</a></li>';
      }
      // Show the very last page preceded by a "..." at the end of the pagination
      // section (before the Next button)
      if (page < pages-1) {
        if (page < pages-2) {
          str += '<li class="out-of-range"><a onclick="callPage('+(page+2)+')">...</a></li>';
        }
        str += '<li class="page-item no"><a onclick="callPage(' + pages + ')">'+pages+'</a></li>';
      }
    }
    // Show the Next button only if you are on a page other than the last
    if (page < pages) {
      str += '<li class="page-item next no"><a onclick="callPage('+(page+1)+')">></a></li>';
    }
    if (pages === 0) {
      str += '<h6>Nenhum registro foi encontrado<h6>';
    }
    str += '</ul>';
    // Return the pagination string to be outputted in the pug templates
    document.getElementById('pagination').innerHTML = str;
    return str;
  }
