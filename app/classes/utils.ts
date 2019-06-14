export class Utils {

  static columnComparator(a, b) {
     return  a.order < b.order ? -1 : ( a.order > b.order ?  1 : 0);
  };

}
