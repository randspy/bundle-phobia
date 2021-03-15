import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatAutocompleteHarness } from '@angular/material/autocomplete/testing';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { SelectBundleComponent } from './select-bundle.component';
import { Observable, of } from 'rxjs';

describe('SelectBundleComponent', () => {
  let component: SelectBundleComponent;
  let fixture: ComponentFixture<SelectBundleComponent>;
  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelectBundleComponent],
      imports: [MatAutocompleteModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectBundleComponent);
    loader = TestbedHarnessEnvironment.loader(fixture);
    component = fixture.componentInstance;
    component.options = of([{ name: 'React' }, { name: 'Angural' }]);
    fixture.detectChanges();
  });

  const selectBy = (selector: any) =>
    fixture.nativeElement.querySelector(selector);

  it('should create', () => {
    expect(component).not.toBeNull();
  });

  it('should contain the title', () => {
    expect(selectBy('#select-bundle').textContent).toContain('BUNDLEPHOBIA');
  });

  it('should contain the help subtitle', () => {
    expect(selectBy('#select-bundle').textContent).toContain(
      'find the cost of adding a npm package to your bundle'
    );
  });

  it('should contain a input', () => {
    expect(selectBy('input')).toBeTruthy();
  });

  it('should contain autocomplete list', async () => {
    const autocomplete = await loader.getHarness(MatAutocompleteHarness);
    expect(autocomplete).not.toBeNull();
  });

  async function getAutocomplate() {
    const autocomplete = await loader.getHarness(MatAutocompleteHarness);
    await autocomplete.focus();
    return autocomplete;
  }

  it('should contain autocomplete list', async () => {
    const autocomplete = await getAutocomplate();
    const options = await autocomplete.getOptions();
    const value = await autocomplete.getValue();

    expect(options.length).toEqual(2);
    expect(await options[0].getText()).toEqual('React');
    expect(await options[1].getText()).toEqual('Angural');
    expect(value).toEqual('');
  });

  it('should type value', async () => {
    const autocomplete = await getAutocomplate();
    await autocomplete.enterText('Rea');
    const value = await autocomplete.getValue();
    expect(value).toEqual('Rea');
  });

  it('should return selected item', async () => {
    spyOn(component.itemSelected, 'emit');
    const autocomplete = await getAutocomplate();
    const options = await autocomplete.getOptions();
    await options[0].click();
    expect(component.itemSelected.emit).toHaveBeenCalledWith({ name: 'React' });
  });
});
