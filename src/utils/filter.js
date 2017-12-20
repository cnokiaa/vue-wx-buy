import Vue from 'vue';
import {filters} from './utils';
for(let filter in filters){
	Vue.filter(filter, filters[filter]);
}
