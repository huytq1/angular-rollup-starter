import * as path from 'path';
import * as fs from 'fs-extra';
import * as sass from 'node-sass';
import { Observable } from 'rxjs';

export function compileSass(srcPath: string, destPath: string): Observable<any> {
  return new Observable(observer => {
    if (!fs.existsSync(srcPath)) {
      observer.complete();
      return;
    }

    let start: Date = new Date();
    sass.render({ file: srcPath }, (err, result) => {
      if (err) {
        observer.error(err);
      }

      fs.outputFile(result.css, destPath, writeErr => {
        if (writeErr) {
          observer.error(err);
        }

        let time: number = new Date().getTime() - start.getTime();
        observer.next(`SASS compiled in ${time}ms`);
        observer.complete();
      });
    });
  });
}
